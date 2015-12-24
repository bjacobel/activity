import React from 'react';
import { WatchEvent } from '../../src/components/event_types';
const ReactDOMServer = require('react-dom/server');

describe('WatchEvent', () => {
  let eventPayload;

  beforeEach(() => {
    eventPayload = {
      repo: {
        name: 'bjacobel/activity'
      }
    };
  });

  it('renders a message about the repo passed being starred', () => {
    const output = ReactDOMServer.renderToStaticMarkup(
      <WatchEvent event={ eventPayload } />
    );

    expect(output).to.equal(
      '<p>Starred <a href="https://github.com/bjacobel/activity">bjacobel/activity</a></p>'
    );
  });
});
