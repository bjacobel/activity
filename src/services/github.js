import { GITHUB } from '../constants';

import 'isomorphic-fetch';

export function getActivity() {
  const url = `https://api.github.com/users/${GITHUB.USER}/events`;
  const params = { headers: { 'User-Agent': GITHUB.UA } };
  const etag = global.localStorage.getItem(GITHUB.LOCALSTORAGE_ETAG_KEY);

  if (etag !== null) {
    Object.assign(params.headers, {
      'If-None-Match': etag
    });
  }

  return global.fetch(url, params)
    .then((response) => {
      if (response.status === 200) {
        global.localStorage.setItem(GITHUB.LOCALSTORAGE_ETAG_KEY, response.headers.get('ETag'));
        return response.text().then((text) => {
          global.localStorage.setItem(GITHUB.LOCALSTORAGE_PAYLOAD_KEY, text);
          return JSON.parse(text);
        });
      } else if (response.status === 304) {
        return JSON.parse(global.localStorage.getItem(GITHUB.LOCALSTORAGE_PAYLOAD_KEY));
      }
    });
}
