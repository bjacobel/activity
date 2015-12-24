import React, { Component, PropTypes } from 'react';

export default class PushEvent extends Component {
  render() {
    const { event } = this.props;

    return (
      <p>PushEvent</p>
    );
  }
}

PushEvent.propTypes = {
  event: PropTypes.object.isRequired
};
