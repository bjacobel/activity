import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reactUtils from 'react-addons-test-utils';

import Main from '../../src/components/Main';
import * as eventActions from '../../src/actions/events';

describe('Main component', () => {
  let sandbox;
  let fetchEventsStub;
  let store;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    fetchEventsStub = sandbox.stub(eventActions, 'fetchEvents').returns(() => {});

    const createStoreWithMiddleware = applyMiddleware(
      thunk
    )(createStore);
    store = createStoreWithMiddleware((state) => {return state;}, {
      events: [
        { id: 1, type: 'asdf' }
      ]
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('dispatches fetchEvents when mounted', () => {
    reactUtils.renderIntoDocument(<Main store={ store }/>);

    expect(fetchEventsStub).to.have.been.calledOnce;
  });
});
