import { NEXT_STEP, PREV_STEP } from '../constants';

export default (state = 0, { type }) => {
  switch (type) {
    case NEXT_STEP:
      return state + 1;

    case PREV_STEP: {
      return state - 1;
    }

    default:
      return state;
  }
};
