import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class Timestamp extends Component {
  render() {
    const { time } = this.props;

    return (
      <p className="timestamp">{ moment(time).fromNow() }</p>
    );
  }
}

Timestamp.propTypes = {
  time: PropTypes.string.isRequired
};
