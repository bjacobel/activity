import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import EventList from './EventList';
import { fetchEvents } from '../actions/events';

function mapStateToProps(state) {
  return {
    events: state.events
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchFetchEvents: () => dispatch(fetchEvents())
  };
}

class Main extends Component {
  componentDidMount() {
    const { dispatchFetchEvents } = this.props;
    dispatchFetchEvents();
  }

  render() {
    const { events } = this.props;

    return (
      <div className="activity">
        <EventList events={ events }/>
      </div>
    );
  }
}

Main.propTypes = {
  dispatchFetchEvents: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
