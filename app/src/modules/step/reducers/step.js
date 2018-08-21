import { NEXT, PREV } from '../constants';

export default (state = 0, { type }) => {
  switch (type) {
    case NEXT:
      return 1;

    case PREV: {
      return 0;
    }

    default:
      return state;
  }
};
