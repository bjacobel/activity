import React, { Component, PropTypes } from 'react';
import {
  DefaultEvent,
  PushEvent
} from '../../src/components/event_types';

export default class EventWrapper extends Component {
  render() {
    const { event } = this.props;

    let eventSubtype;

    switch (event.type) {
    case 'CreateEvent':
      eventSubtype = <DefaultEvent event={ event } />;
      break;
    case 'ForkEvent':
      eventSubtype = <DefaultEvent event={ event } />;
      break;
    case 'IssueCommentEvent':
      eventSubtype = <DefaultEvent event={ event } />;
      break;
    case 'IssuesEvent':
      eventSubtype = <DefaultEvent event={ event } />;
      break;
    case 'PublicEvent':
      eventSubtype = <DefaultEvent event={ event } />;
      break;
    case 'PullRequestEvent':
      eventSubtype = <DefaultEvent event={ event } />;
      break;
    case 'PullRequestReviewCommentEvent':
      eventSubtype = <DefaultEvent event={ event } />;
      break;
    case 'PushEvent':
      eventSubtype = <PushEvent event={ event } />;
      break;
    case 'WatchEvent':
      eventSubtype = <DefaultEvent event={ event } />;
      break;
    default:
      eventSubtype = <DefaultEvent event={ event } />;
      break;
    }

    return (
      <li>
        { eventSubtype }
      </li>
    );
  }
}

EventWrapper.propTypes = {
  event: PropTypes.shape({
    type: PropTypes.string.isRequired
  }).isRequired
};
