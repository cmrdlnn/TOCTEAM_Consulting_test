import { combineReducers } from 'redux';

import authentication from './authentication';
import step from './step';

export default combineReducers({
  authentication,
  step,
});
