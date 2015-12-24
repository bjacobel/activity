import React, { Component, PropTypes } from 'react';
import Timestamp from './Timestamp';
import {
  CreateEvent,
  ForkEvent,
  IssueCommentEvent,
  IssuesEvent,
  PublicEvent,
  PullRequestEvent,
  PullRequestReviewCommentEvent,
  PushEvent,
  WatchEvent
} from '../../src/components/event_types';

export default class EventWrapper extends Component {
  render() {
    const { event } = this.props;

    let eventSubtype;

    switch (event.type) {
    case 'CreateEvent':
      eventSubtype = <CreateEvent event={ event } />;
      break;
    case 'ForkEvent':
      eventSubtype = <ForkEvent event={ event } />;
      break;
    case 'IssueCommentEvent':
      eventSubtype = <IssueCommentEvent event={ event } />;
      break;
    case 'IssuesEvent':
      eventSubtype = <IssuesEvent event={ event } />;
      break;
    case 'PublicEvent':
      eventSubtype = <PublicEvent event={ event } />;
      break;
    case 'PullRequestEvent':
      eventSubtype = <PullRequestEvent event={ event } />;
      break;
    case 'PullRequestReviewCommentEvent':
      eventSubtype = <PullRequestReviewCommentEvent event={ event } />;
      break;
    case 'PushEvent':
      eventSubtype = <PushEvent event={ event } />;
      break;
    case 'WatchEvent':
      eventSubtype = <WatchEvent event={ event } />;
      break;
    default:
      // Don't know how to handle this event type
      return <li/>;
    }

    return (
      <li className="event">
        <Timestamp time={ event.created_at } />
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
