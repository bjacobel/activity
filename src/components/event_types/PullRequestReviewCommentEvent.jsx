import React, { Component, PropTypes } from 'react';

export default class PullRequestReviewCommentEvent extends Component {
  render() {
    const { event } = this.props;

    return (
      <p>PullRequestReviewCommentEvent</p>
    );
  }
}

PullRequestReviewCommentEvent.propTypes = {
  event: PropTypes.object.isRequired
};
