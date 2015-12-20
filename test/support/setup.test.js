import { expect } from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
global.expect = expect;
global.sinon = sinon;

before((done) => {
  if (global.jsdom) {
    global.jsdom.env({
      html: '<div></div>',
      done: (err, window) => {
        global.window = window;
        global.document = window.document;
        done();
      }
    });
  } else {
    done();
  }
});
