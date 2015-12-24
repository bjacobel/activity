import React from 'react';
import reactUtils from 'react-addons-test-utils';
import Timestamp from '../../src/components/Timestamp';

describe('Timestamp', () => {
  let renderer;

  beforeEach(() => {
    renderer = reactUtils.createRenderer();
  });

  it('renders a human-readable label from an ISO8601 timestamp using Moment', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    renderer.render(<Timestamp time={ yesterday.toISOString() } />);
    const output = renderer.getRenderOutput();
    expect(output.props.children).to.equal('a day ago');
  });
});
