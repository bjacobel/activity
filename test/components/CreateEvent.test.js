import React from 'react';
import { CreateEvent } from '../../src/components/event_types';
const ReactDOMServer = require('react-dom/server');

describe('CreateEvent', () => {
  let eventPayload;

  beforeEach(() => {
    eventPayload = {
      payload: {
        ref: 'testbranch',
        ref_type: 'branch'
      },
      repo: {
        name: 'bjacobel/activity'
      }
    };
  });

  it('renders a \'new branch created\' msg if ref_type is branch', () => {
    const output = ReactDOMServer.renderToStaticMarkup(
      <CreateEvent event={ eventPayload } />
    );

    expect(output).to.have.string('Created new branch');
    expect(output).to.have.string('bjacobel/activity/tree/testbranch');
  });

  it('renders a \'new tag created\' msg if ref_type is tag', () => {
    eventPayload.payload.ref = 'testtag';
    eventPayload.payload.ref_type = 'tag';

    const output = ReactDOMServer.renderToStaticMarkup(
      <CreateEvent event={ eventPayload } />
    );

    expect(output).to.have.string('Created new tag');
    expect(output).to.have.string('bjacobel/activity/tree/testtag');
  });

  it('renders a \'new repo created\' msg if ref_type is repository', () => {
    eventPayload.payload.ref_type = 'repository';
    eventPayload.payload.description = 'github activity dashboard';

    const output = ReactDOMServer.renderToStaticMarkup(
      <CreateEvent event={ eventPayload } />
    );

    expect(output).to.have.string('Created new repository');
    expect(output).to.have.string('github activity dashboard');
  });
});
