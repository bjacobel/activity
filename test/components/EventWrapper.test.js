import React from 'react';
import reactUtils from 'react-addons-test-utils';
import EventWrapper from '../../src/components/EventWrapper';
import {
  DefaultEvent,
  PushEvent
} from '../../src/components/event_types';

describe('EventWrapper', () => {
  let renderer;

  beforeEach(() => {
    renderer = reactUtils.createRenderer();
  });

  it('selects an appropriate component subtype based on event.type', () => {
    const event = { id: 1, type: 'PushEvent' };
    renderer.render(<EventWrapper event={ event } />);
    const output = renderer.getRenderOutput();
    expect(output.type).to.equal('li');
    expect(output.props.children).to.deep.equal(
      <PushEvent event={ event } />
    );
  });

  it('returns a DefaultEvent if event.type is not known', () => {
    const event = { id: 1, type: 'AsdfEvent' };
    renderer.render(<EventWrapper event={ event } />);
    const output = renderer.getRenderOutput();
    expect(output.type).to.equal('li');
    expect(output.props.children).to.deep.equal(
      <DefaultEvent event={ event } />
    );
  });
});
