import { combineReducers } from 'redux';

import authentication from './authentication';
import step from './step';
import viewer from './viewer';

export default combineReducers({
  authentication,
  step,
  viewer,
});
