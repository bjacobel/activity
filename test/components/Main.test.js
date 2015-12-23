import React from 'react';
import reactUtils from 'react-addons-test-utils';
import Main from '../../src/components/Main';
import * as eventActions from '../../src/actions/events';

describe('Main component', () => {
  let sandbox;
  let fetchEventsStub;
  let renderer;
  let store;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    fetchEventsStub = sandbox.stub(eventActions, 'fetchEvents').returns(new Promise(() => {}));
    fetchEventsStub.resolves();

    renderer = reactUtils.createRenderer();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('dispatches fetchEvents when constructed', () => {
    renderer.render(<Main store={ store }/>);
    expect(fetchEventsStub).to.have.been.calledOnce();
  });

  it('renders an EventList', () => {
    renderer.render(<Main store={ store }/>);
    const output = renderer.getRenderOutput();
    expect(output.type).to.eq('EventList');
  });
});
