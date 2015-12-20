import {
  GITHUB_USER,
  GITHUB_UA,
  GITHUB_LOCALSTORAGE_ETAG_KEY,
  GITHUB_LOCALSTORAGE_PAYLOAD_KEY
} from '../constants';

import 'whatwg-fetch';

export function getActivity() {
  let params = { 'User-Agent': GITHUB_UA };
  const etag = localStorage.getItem(GITHUB_LOCALSTORAGE_ETAG_KEY);

  if (etag !== null) {
    params = Object.assign(params, {
      headers: { 'ETag': etag }
    });
  }

  return fetch(`https://api.github.com/users/${GITHUB_USER}/events`, params)
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem(GITHUB_LOCALSTORAGE_ETAG_KEY, response.headers.get('ETag'));
        localStorage.setItem(GITHUB_LOCALSTORAGE_PAYLOAD_KEY, response);
        return response;
      } else if (response.status === 304) {
        return localStorage.getItem(GITHUB_LOCALSTORAGE_PAYLOAD_KEY);
      }
    })
    .then((response) => {
      return response.json();
    });
}
