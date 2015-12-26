import React, { Component, PropTypes } from 'react';

export default class Octicon extends Component {
  render() {
    const { name, className } = this.props;
    return <span className={ `octicon octicon-${name} ${className}` }></span>;
  }
}

Octicon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string
};
