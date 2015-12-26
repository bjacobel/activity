import React, { Component, PropTypes } from 'react';
const Icon = require('react-icon');
import '../../utils';

export default class PullRequestEvent extends Component {
  render() {
    const { event } = this.props;
    const actionName = event.payload.action;

    const { additions, deletions } = event.payload.pull_request;
    const changedFiles = event.payload.pull_request.changed_files;

    // Only display opened/closed changes on PRs
    // @TODO: Other events include (un)assign, (un)label... include these later
    if (['opened', 'closed', 'reopened'].indexOf(actionName) < 0) {
      return '';
    }

    const baseURL = `https://github.com/${ event.repo.name }`;

    return (
      <div>
        <p>
          <span>{ event.payload.action.titleCase() } pull request </span>
          <span><a href={ `${ baseURL }/pulls/${ event.payload.number }` }>#{ event.payload.number }</a> </span>
          <span>at <a href={ baseURL }>{ event.repo.name }</a></span>
        </p>
        <p className="indented">
          <span><i>{ event.payload.pull_request.title }</i> </span>
          <span><Icon glyph="plus"/>{ additions } -{ deletions } f{ changedFiles }</span>
        </p>
      </div>
    );
  }
}

PullRequestEvent.propTypes = {
  event: PropTypes.shape({
    payload: PropTypes.shape({
      action: PropTypes.string.isRequired,
      pull_request: PropTypes.shape({
        additions: PropTypes.number.isRequired,
        deletions: PropTypes.number.isRequired,
        changed_files: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
      }).isRequired,
      number: PropTypes.number.isRequired
    }).isRequired,
    repo: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
