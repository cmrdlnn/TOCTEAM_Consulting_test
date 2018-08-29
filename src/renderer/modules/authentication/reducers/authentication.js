import { ADD_ERROR, AUTHENTICATE, LOADING } from '../constants';
import { PREV } from '../../step/constants';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_ERROR:
      return { error: payload };

    case AUTHENTICATE: {
      return payload;
    }

    case LOADING: {
      return { loading: true };
    }

    case PREV: {
      if (state.client) state.client.close();
      return {};
    }

    default:
      return state;
  }
};
