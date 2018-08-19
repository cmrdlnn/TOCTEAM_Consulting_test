import { CD, LS, MV } from '../constants';

export default (state = { list: [] }, { type, payload }) => {
  switch (type) {
    case LS: {
      return { ...state, list: payload };
    }

    default:
      return state;
  }
};
