import React, { Component, PropTypes } from 'react';

export default class WatchEvent extends Component {
  render() {
    const { event } = this.props;

    const repoURL = `https://github.com/${ event.repo.name }`;

    return (
      <p>Starred <a href={ repoURL }>{ event.repo.name }</a></p>
    );
  }
}

WatchEvent.propTypes = {
  event: PropTypes.shape({
    repo: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
