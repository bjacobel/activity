import { GITHUB } from '../constants';

import 'isomorphic-fetch';

export function getActivity() {
  const params = { headers: { 'User-Agent': GITHUB.UA } };
  const etag = global.localStorage.getItem(GITHUB.LOCALSTORAGE_ETAG_KEY);

  if (etag !== null) {
    Object.assign(params.headers, {
      'ETag': etag
    });
  }

  return global.fetch(`https://api.github.com/users/${GITHUB.USER}/events`, params)
    .then((response) => {
      if (response.status === 200) {
        global.localStorage.setItem(GITHUB.LOCALSTORAGE_ETAG_KEY, response.headers.get('ETag'));
        global.localStorage.setItem(GITHUB.LOCALSTORAGE_PAYLOAD_KEY, response);
        return response;
      } else if (response.status === 304) {
        return global.localStorage.getItem(GITHUB.LOCALSTORAGE_PAYLOAD_KEY);
      }
    })
    .then((response) => {
      return response.json();
    });
}
