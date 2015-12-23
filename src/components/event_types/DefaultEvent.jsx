import React, { Component, PropTypes } from 'react';

export default class DefaultEvent extends Component {
  render() {
    const { event } = this.props;

    return (
      <p>DefaultEvent</p>
    );
  }
}

DefaultEvent.propTypes = {
  event: PropTypes.object.isRequired
};
