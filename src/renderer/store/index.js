import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from 'modules';

function configureStore() {
  const middleware = [thunk];

  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger());
  }

  return createStore(rootReducer, applyMiddleware(...middleware));
}

const store = configureStore();

export default store;
