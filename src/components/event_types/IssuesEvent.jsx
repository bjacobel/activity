import React, { Component, PropTypes } from 'react';

export default class IssuesEvent extends Component {
  render() {
    const { event } = this.props;

    return (
      <p>IssuesEvent</p>
    );
  }
}

IssuesEvent.propTypes = {
  event: PropTypes.object.isRequired
};
