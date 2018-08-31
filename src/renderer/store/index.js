import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'modules';

function configureStore() {
  const middleware = [thunk];

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    const logger = require('redux-logger').createLogger();

    middleware.push(logger);
  }

  return createStore(rootReducer, applyMiddleware(...middleware));
}

const store = configureStore();

export default store;
