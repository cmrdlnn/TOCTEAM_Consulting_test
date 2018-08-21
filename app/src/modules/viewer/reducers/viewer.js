import { CD, LS, MV } from '../constants';
import { PREV } from '../../step/constants';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case LS: {
      return { ...state, list: payload };
    }

    case PREV: {
      return {};
    }

    default:
      return state;
  }
};
