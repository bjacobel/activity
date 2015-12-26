import React, { Component, PropTypes } from 'react';

export default class PushEvent extends Component {
  render() {
    const { event } = this.props;

    const pluralCommits = event.payload.size > 1 ? 's' : '';
    const branch = event.payload.ref.slice(11);
    const githubBase = `https://github.com/${ event.repo.name }`;

    return (
      <div>
        <p>
          <span>Pushed { event.payload.size } commit{ pluralCommits } </span>
          <span>to <a href={ `${ githubBase }/tree/${ branch }` }>{ branch }</a> </span>
          <span>at <a href={ `${ githubBase }` }>{ event.repo.name }</a></span>
        </p>
        { event.payload.commits.map((commit) => {
          return (
            <p className="indented code" key={ commit.sha }>
              <span><a href={ `${ githubBase }/commit/${ commit.sha }` }>{ commit.sha.slice(0, 7) }</a>:</span>
              <span> { commit.message }</span>
            </p>
          );
        }) }
      </div>
    );
  }
}

PushEvent.propTypes = {
  event: PropTypes.shape({
    payload: PropTypes.shape({
      commits: PropTypes.arrayOf(PropTypes.shape({
        message: PropTypes.string.isRequired,
        sha: PropTypes.string.isRequired
      })).isRequired,
      ref: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired
    }),
    repo: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }).isRequired
};
