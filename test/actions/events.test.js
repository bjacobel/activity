import * as eventActions from '../../src/actions/events';
import * as github from '../../src/services/github';

describe('Event actions', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('requestEvents returns that as a type', () => {
    const action = eventActions.requestEvents();
    expect(action).to.deep.equal({ type: eventActions.REQUEST_EVENTS });
  });

  it('receivedEvents returns that as a type, with whatever events are passed', () => {
    const action = eventActions.receivedEvents('foo');
    expect(action).to.deep.equal({ type: eventActions.RECEIVED_EVENTS, events: 'foo' });
  });

  it('requestEventsFailed returns that as a type, and logs any err passed', () => {
    const consoleDotWarn = sandbox.stub(console, 'warn');
    const action = eventActions.requestEventsFailed('test error');
    expect(action).to.deep.equal({ type: eventActions.REQUEST_EVENTS_FAILED });
    expect(consoleDotWarn).to.have.been.calledWithExactly('test error');
  });

  it('fetchEvents dispatches receivedEvents asynchronously on success', () => {
    const activity = [
      { id: 1 },
      { id: 2 }
    ];

    sandbox.stub(github, 'getActivity').resolves(activity);

    const dispatch = sandbox.spy();
    eventActions.fetchEvents()(dispatch);

    expect(dispatch.firstCall.args[0]).to.deep.equal({ type: eventActions.REQUEST_EVENTS });

    return github.getActivity()
      .then((events) => {
        expect(dispatch.secondCall.args[0]).to.deep.equal({ type: eventActions.RECEIVED_EVENTS, events });
      });
  });

  it('fetchEvents dispatches requestEventsFailed asynchronously on failure', () => {
    sandbox.stub(github, 'getActivity').resolves();

    const dispatch = sandbox.spy();
    eventActions.fetchEvents()(dispatch);

    expect(dispatch.firstCall.args[0]).to.deep.equal({ type: eventActions.REQUEST_EVENTS });

    return github.getActivity()
      .catch(() => {
        expect(dispatch.secondCall.args[0]).to.deep.equal({ type: eventActions.REQUEST_EVENTS_FAILED });
      });
  });
});
