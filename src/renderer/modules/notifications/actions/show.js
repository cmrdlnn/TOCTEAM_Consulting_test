import { HIDE, SHOW } from '../constants';

export default (message, type = 'danger') => (dispatch) => {
  const id = new Date().getTime().toString();

  setTimeout(() => {
    dispatch({
      type: HIDE,
      payload: id,
    });
  }, 5000);

  dispatch({
    type: SHOW,
    payload: {
      [id]: {
        type,
        message,
      },
    },
  });
};
