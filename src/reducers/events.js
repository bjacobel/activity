import * as eventActions from '../actions/events';

export default function users(state = [], action) {
  switch (action.type) {
  case eventActions.RECEIVED_EVENTS:
    return action.events.map((event) => {
      return event;  // @TODO: Do more data destructuring here
    });
  default:
    return state;
  }
}
