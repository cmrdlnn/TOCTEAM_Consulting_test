import { HIDE, SHOW } from '../constants';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case HIDE: {
      const { [payload]: notification, ...newState } = state;
      return newState;
    }

    case SHOW: {
      return { ...state, ...payload };
    }

    default:
      return state;
  }
};
