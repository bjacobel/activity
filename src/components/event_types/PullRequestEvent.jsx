import React, { Component, PropTypes } from 'react';

export default class PullRequestEvent extends Component {
  render() {
    const { event } = this.props;

    return (
      <p>PullRequestEvent</p>
    );
  }
}

PullRequestEvent.propTypes = {
  event: PropTypes.object.isRequired
};
