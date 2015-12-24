import React, { Component, PropTypes } from 'react';

export default class IssueCommentEvent extends Component {
  render() {
    const { event } = this.props;

    return (
      <p>IssueCommentEvent</p>
    );
  }
}

IssueCommentEvent.propTypes = {
  event: PropTypes.object.isRequired
};
