import React, { Component, PropTypes } from 'react';

export default class CreateEvent extends Component {
  render() {
    const { event } = this.props;

    let refURL;
    let component;
    const repoBase = `https://github.com/${ event.repo.name }`;

    if (['branch', 'tag'].indexOf(event.payload.ref_type) >= 0) {
      refURL = `${ repoBase }/tree/${ event.payload.ref }`;
      component = (
        <p>
          <span>Created new { event.payload.ref_type } </span>
          <span><a href={ refURL }>{ event.payload.ref }</a> </span>
          <span>on <a href={ repoBase }>{ event.repo.name }</a></span>
        </p>
      );
    } else {
      refURL = repoBase;
      component = (
        <div>
          <p>
            <span>Created new repository </span>
            <span><a href={ refURL }>{ event.payload.ref }</a> </span>
          </p>
          <p className="indented code">{ event.payload.description }</p>
        </div>
      );
    }

    return component;
  }
}

CreateEvent.propTypes = {
  event: PropTypes.shape({
    payload: PropTypes.shape({
      ref: PropTypes.string,
      ref_type: PropTypes.oneOf(['branch', 'repository', 'tag']).isRequired,
      description: PropTypes.string.isRequired
    }).isRequired,
    repo: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
