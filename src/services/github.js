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
      let body;

      if (response.status === 200) {
        body = response.json();
        global.localStorage.setItem(GITHUB.LOCALSTORAGE_ETAG_KEY, response.headers.ETag);
        global.localStorage.setItem(GITHUB.LOCALSTORAGE_PAYLOAD_KEY, response.body);
      } else if (response.status === 304) {
        body = JSON.parse(global.localStorage.getItem(GITHUB.LOCALSTORAGE_PAYLOAD_KEY));
      }

      return body;
    });
}
