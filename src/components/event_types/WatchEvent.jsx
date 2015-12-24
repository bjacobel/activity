import React, { Component, PropTypes } from 'react';

export default class WatchEvent extends Component {
  render() {
    const { event } = this.props;

    return (
      <p>WatchEvent</p>
    );
  }
}

WatchEvent.propTypes = {
  event: PropTypes.object.isRequired
};
