import React, { Component, PropTypes } from 'react';

export default class PublicEvent extends Component {
  render() {
    const { event } = this.props;

    return (
      <p>PublicEvent</p>
    );
  }
}

PublicEvent.propTypes = {
  event: PropTypes.object.isRequired
};
