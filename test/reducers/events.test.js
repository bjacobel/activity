import events from '../../src/reducers/events';
import {
  RECEIVED_EVENTS,
  REQUEST_EVENTS
} from '../../src/actions/events';

describe('Event reducers', () => {
  it('receives events and adds them to state', () => {
    const state = events(
      {}, {
        type: RECEIVED_EVENTS,
        events: [
          { id: 1 }
        ]
      }
    );
    expect(state).to.deep.equal([{ id: 1 }]);
  });

  it('just returns previous state for other actions', () => {
    const state = events(
      {}, { type: REQUEST_EVENTS }
    );
    expect(state).to.deep.equal({});
  });
});
