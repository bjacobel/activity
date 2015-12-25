import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class Timestamp extends Component {
  componentWillMount() {
    const { time } = this.props;
    this.setState({ label: moment(time).fromNow() });
  }

  componentDidMount() {
    this.ticker = global.setInterval(() => {
      this.setState({ updated: new Date() });
    }, 5000);
  }

  shouldComponentUpdate(nextProps) {
    return moment(nextProps.time).fromNow() !== this.state.label;
  }

  componentWillUpdate() {
    const { time } = this.props;
    this.setState({ label: moment(time).fromNow() });
  }

  componentWillUnmount() {
    global.clearInterval(this.ticker);
  }

  render() {
    const { label } = this.state;

    return (
      <p className="timestamp">{ label }</p>
    );
  }
}

Timestamp.propTypes = {
  time: PropTypes.string.isRequired
};
