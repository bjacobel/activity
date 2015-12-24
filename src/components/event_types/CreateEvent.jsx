import React, { Component, PropTypes } from 'react';

export default class CreateEvent extends Component {
  render() {
    const { event } = this.props;

    return (
      <p>CreateEvent</p>
    );
  }
}

CreateEvent.propTypes = {
  event: PropTypes.object.isRequired
};
