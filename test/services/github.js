import { getActivity } from '../../services/github';
import {
  GITHUB_USER,
  GITHUB_UA,
  GITHUB_LOCALSTORAGE_ETAG_KEY,
  GITHUB_LOCALSTORAGE_PAYLOAD_KEY
} from '../constants';

describe('Github services', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getActivity', () => {
    let localStorageMock = {};
    let githubURL;

    beforeEach(() => {
      sinon.stub(localStorage, 'getItem', (itemName) => {
        return localStorageMock.get(itemName);
      });
      sinon.stub(localStorage, 'setItem', (itemName, itemVal) => {
        localStorageMock = Object.assign(localStorageMock, { itemName: itemVal });
      });
      sinon.stub(fetch).returns(new Promise(() => {}));

      githubURL = `https://api.github.com/users/${GITHUB_USER}/events`;
    });

    it('sends params with just User-Agent if no etag in localstorage', () => {
      getActivity();
      expect(fetch).to.have.been.calledWithExactly(githubURL, { 'User-Agent': GITHUB_UA });
    });

    it('sets an etag header if one exists in localstorage', () => {
      localStorageMock = Object.assign(localStorageMock, {
        [GITHUB_LOCALSTORAGE_ETAG_KEY]: 'asdf'
      });
      getActivity();
      expect(fetch).to.have.been.calledWithExactly(githubURL, {
        'User-Agent': GITHUB_UA,
        [GITHUB_LOCALSTORAGE_ETAG_KEY]: 'asdf'
      });
    });
  });
});
