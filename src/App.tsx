import * as React from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducers';

const middleware: any = [thunk];

if (__DEV__ === true) {
  middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));

import { HomeContainer } from './containers/Home';

export default () => (
  <Provider store={store}>
    <HomeContainer />
  </Provider>
);
