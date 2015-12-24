import React from 'react';
import { PushEvent } from '../../src/components/event_types';
const ReactDOMServer = require('react-dom/server');

describe('PushEvent', () => {
  let eventPayload;

  beforeEach(() => {
    eventPayload = {
      payload: {
        commits: [
          {
            message: 'Added a feature',
            sha: '123qeew232345w343wewee'
          },
          {
            message: 'Fixed a bug',
            sha: 'fb0q348qur0wefjqf2f8h'
          }
        ],
        ref: 'refs/heads/master',
        size: 2
      },
      repo: {
        name: 'bjacobel/activity'
      }
    };
  });

  it('properly handles pluralizing \'commit\'', () => {
    let output;

    output = ReactDOMServer.renderToStaticMarkup(
      <PushEvent event={ eventPayload } />
    );
    expect(output).to.have.string('Pushed 2 commits');

    eventPayload.payload.size = 1;

    output = ReactDOMServer.renderToStaticMarkup(
      <PushEvent event={ eventPayload } />
    );
    expect(output).to.have.string('Pushed 1 commit');
  });

  it('links to the right branch', () => {
    const output = ReactDOMServer.renderToStaticMarkup(
      <PushEvent event={ eventPayload } />
    );

    expect(output).to.have.string(
      'to <a href="https://github.com/bjacobel/activity/tree/master">master</a>'
    );
  });

  it('links to the right repo', () => {
    const output = ReactDOMServer.renderToStaticMarkup(
      <PushEvent event={ eventPayload } />
    );

    expect(output).to.have.string(
      'at <a href="https://github.com/bjacobel/activity">bjacobel/activity</a>'
    );
  });

  it('creates as many children as there are commits in event.payload.commits', () => {
    const output = ReactDOMServer.renderToStaticMarkup(
      <PushEvent event={ eventPayload } />
    );

    expect(output).to.have.string(
      eventPayload.payload.commits[0].message
    );
    expect(output).to.have.string(
      eventPayload.payload.commits[1].sha.slice(0, 7)
    );
  });
});
