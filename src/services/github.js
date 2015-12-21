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
      let status;
      let body;

      if (response.status === 200) {
        status = 200;
        body = response.body;

        global.localStorage.setItem(GITHUB.LOCALSTORAGE_ETAG_KEY, response.headers.ETag);
        global.localStorage.setItem(GITHUB.LOCALSTORAGE_PAYLOAD_KEY, response.body);
      } else if (response.status === 304) {
        status = 304;
        body = global.localStorage.getItem(GITHUB.LOCALSTORAGE_PAYLOAD_KEY);
      }

      return {
        status,
        body: JSON.parse(body)
      };
    });
}
