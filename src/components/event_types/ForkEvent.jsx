import React, { Component, PropTypes } from 'react';

export default class ForkEvent extends Component {
  render() {
    const { event } = this.props;

    return (
      <p>ForkEvent</p>
    );
  }
}

ForkEvent.propTypes = {
  event: PropTypes.object.isRequired
};
