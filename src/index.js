import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import './stylesheets';
import HelloWorld from './components/HelloWorld';
import reducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
  <div>
    <Provider store={ store }>
      <HelloWorld />
    </Provider>
  </div>,
  document.getElementById('main')
);
