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
  constructor(props) {
    super(props);
    props.dispatchFetchEvents();
  }

  render() {
    const { store } = this.context;
    const { events } = store.getState();

    return (
      <EventList events={ events }/>
    );
  }
}

Main.propTypes = {
  dispatchFetchEvents: PropTypes.func.isRequired
};

Main.contextTypes = {
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);