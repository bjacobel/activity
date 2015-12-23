import React from 'react';
import reactUtils from 'react-addons-test-utils';
import EventList from '../../src/components/EventList';
import EventWrapper from '../../src/components/EventWrapper';

describe('EventList', () => {
  let renderer;

  beforeEach(() => {
    renderer = reactUtils.createRenderer();
  });

  it('renders a list of eventwrappers wrapping assorted events', () => {
    const pushEvent = { type: 'PushEvent', id: 1 };
    const forkEvent = { type: 'ForkEvent', id: 2 };
    const createEvent = { type: 'CreateEvent', id: 3 };

    const events = [pushEvent, forkEvent, createEvent];

    renderer.render(<EventList events={ events }/>);
    const output = renderer.getRenderOutput();

    expect(output.type).to.equal('ol');
    expect(output.props.children).to.deep.equal([
      <EventWrapper key="1" event={ pushEvent } />,
      <EventWrapper key="2" event={ forkEvent } />,
      <EventWrapper key="3" event={ createEvent } />
    ]);
  });
});
