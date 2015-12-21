import { getActivity } from '../../src/services/github';
import { GITHUB } from '../../src/constants';
require('isomorphic-fetch');

describe('Github services', () => {
  let sandbox;
  let server;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    server = sinon.fakeServer.create();
    server.respondImmediately = true;
  });

  afterEach(() => {
    sandbox.restore();
    server.restore();
  });

  describe('getActivity', () => {
    let mockStorage;
    let githubURL;
    let fetchStub;

    beforeEach(() => {
      mockStorage = {};
      global.localStorage = {};
      global.localStorage.getItem = (itemName) => {
        if (mockStorage.hasOwnProperty(itemName)) {
          return mockStorage[itemName];
        }
        return null;
      };

      global.localStorage.setItem = (itemName, itemVal) => {
        mockStorage = Object.assign(mockStorage, { [itemName]: itemVal });
      };

      fetchStub = sandbox.stub(global, 'fetch');

      githubURL = `https://api.github.com/users/${GITHUB.USER}/events`;
    });

    describe('while sending', () => {
      beforeEach(() => {
        fetchStub.resolves();
      });

      it('sends params with just User-Agent if no etag in localstorage', () => {
        getActivity();

        expect(fetchStub).to.have.been.calledOnce;
        expect(fetchStub).to.have.been.calledWith(githubURL, {
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

        expect(fetchStub).to.have.been.calledOnce;
        expect(fetchStub).to.have.been.calledWith(githubURL, {
          headers: {
            'User-Agent': GITHUB.UA,
            ETag: 'asdf'
          }
        });
      });
    });

    describe('while recieving', () => {
      it('returns whatever what was memoized if fetch is passed an etag and gets 304', () => {
        Object.assign(mockStorage, {
          [GITHUB.LOCALSTORAGE_ETAG_KEY]: 'asdf',
          [GITHUB.LOCALSTORAGE_PAYLOAD_KEY]: '{"idk": "mybffjill"}'
        });

        server.respondWith('GET', githubURL, [304, {}, '']);

        fetchStub.resolves({
          status: 304,
          headers: {},
          body: '{}'
        });

        return getActivity().then((response) => {
          expect(response.body).to.deep.equal({ idk: 'mybffjill' });
        });
      });

      it('returns response content as json if status was 200 and passed an etag', () => {
        Object.assign(mockStorage, {
          [GITHUB.LOCALSTORAGE_ETAG_KEY]: 'asdf'
        });

        fetchStub.resolves({
          status: 200,
          headers: {},
          body: '{"this": "isjson"}'
        });

        return getActivity().then((response) => {
          expect(response.body).to.deep.equal({ this: 'isjson' });
        });
      });

      it('memoizes the reponse body and etag after a 200 response', () => {
        fetchStub.resolves({
          status: 200,
          headers: { ETag: 'foo' },
          body: '{"most": "wonderfultimeoftheyear"}'
        });

        return getActivity().then(() => {
          expect(mockStorage[GITHUB.LOCALSTORAGE_PAYLOAD_KEY]).to.equal('{"most": "wonderfultimeoftheyear"}');
          expect(mockStorage[GITHUB.LOCALSTORAGE_ETAG_KEY]).to.equal('foo');
        });
      });

      it('allows us to catch errors with a .catch()', () => {
        fetchStub.rejects({
          status: 500,
          headers: {},
          body: ''
        });

        return getActivity().catch((err) => {
          expect(err.status).to.equal(500);
        });
      });
    });
  });
});
