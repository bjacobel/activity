import React, { Component, PropTypes } from 'react';

import EventWrapper from './EventWrapper';

export default class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <ol>
        { events.map((event) => {
          return <EventWrapper key={ event.id } event={ event } />;
        }) }
      </ol>
    );
  }
}

EventList.propTypes = {
  events: PropTypes.array.isRequired
};
