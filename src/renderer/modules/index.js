import { combineReducers } from 'redux';

import authentication from './authentication';
import notifications from './notifications';
import step from './step';
import viewer from './viewer';

export default combineReducers({
  authentication,
  notifications,
  step,
  viewer,
});
