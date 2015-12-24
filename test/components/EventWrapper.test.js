import React from 'react';
import reactUtils from 'react-addons-test-utils';
import EventWrapper from '../../src/components/EventWrapper';
import Timestamp from '../../src/components/Timestamp';
import {
  PushEvent
} from '../../src/components/event_types';

describe('EventWrapper', () => {
  let renderer;

  beforeEach(() => {
    renderer = reactUtils.createRenderer();
  });

  it('selects an appropriate component subtype based on event.type', () => {
    const now = new Date().toISOString();
    const event = { id: 1, type: 'PushEvent', created_at: now };
    renderer.render(<EventWrapper event={ event } />);
    const output = renderer.getRenderOutput();
    expect(output.type).to.equal('li');
    expect(output.props.children).to.deep.equal([
      <Timestamp time={ now } />,
      <PushEvent event={ event } />
    ]);
  });

  it('returns an empty li if event.type is not known', () => {
    const event = { id: 1, type: 'AsdfEvent' };
    renderer.render(<EventWrapper event={ event } />);
    const output = renderer.getRenderOutput();
    expect(output.type).to.equal('li');
    expect(output.props.children).to.be.undefined;
  });
});
