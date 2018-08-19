import { ADD_ERROR, AUTHENTICATE } from '../constants';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_ERROR:
      return { error: payload };

    case AUTHENTICATE: {
      return { client: payload };
    }

    default:
      return state;
  }
};
