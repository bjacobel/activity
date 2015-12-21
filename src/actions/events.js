import * as github from '../services/github';

export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const RECEIVED_EVENTS = 'RECEIVED_EVENTS';
export const REQUEST_EVENTS_FAILED = 'REQUEST_EVENTS_FAILED';

export function requestEvents() {
  return { type: REQUEST_EVENTS };
}

export function receivedEvents(events) {
  return { type: RECEIVED_EVENTS, events };
}

export function requestEventsFailed(err) {
  console.warn(err);
  return { type: REQUEST_EVENTS_FAILED };
}

export function fetchEvents() {
  return (dispatch) => {
    dispatch(requestEvents());

    return github.getActivity()
      .then((events) => {
        dispatch(receivedEvents(events));
      })
      .catch((err) => {
        dispatch(requestEventsFailed(err));
      });
  };
}
