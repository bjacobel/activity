import { getActivity } from '../../src/services/github';
import { GITHUB } from '../../src/constants';
require('isomorphic-fetch');

describe('Github services', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getActivity', () => {
    let mockStorage = {};
    let githubURL;
    let fetchSpy;

    beforeEach(() => {
      global.localStorage = {};
      global.localStorage.getItem = (itemName) => {
        if (mockStorage.hasOwnProperty(itemName)) {
          return mockStorage[itemName];
        }
        return null;
      };

      global.localStorage.setItem = (itemName, itemVal) => {
        mockStorage = Object.assign(mockStorage, { itemName: itemVal });
      };

      fetchSpy = sandbox.spy(global, 'fetch');

      githubURL = `https://api.github.com/users/${GITHUB.USER}/events`;
    });

    it('sends params with just User-Agent if no etag in localstorage', () => {
      getActivity();

      expect(fetchSpy).to.have.been.calledOnce;
      expect(fetchSpy).to.have.been.calledWith(githubURL, {
        headers: {
          'User-Agent': GITHUB.UA
        }
      });
    });

    it('sets an etag header if one exists in localstorage', () => {
      Object.assign(mockStorage, {
        [GITHUB.LOCALSTORAGE_ETAG_KEY]: 'asdf'
      });

      getActivity();

      expect(fetchSpy).to.have.been.calledOnce;
      expect(fetchSpy).to.have.been.calledWith(githubURL, {
        headers: {
          'User-Agent': GITHUB.UA,
          ETag: 'asdf'
        }
      });
    });
  });
});
