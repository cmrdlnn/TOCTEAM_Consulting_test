import { showNotification } from 'modules/notifications';

import { RM } from '../constants';
import { removeNode } from '../utils';

export default path => (dispatch, getState) => {
  const { authentication: { client }, viewer: { list } } = getState();

  return new Promise((resolve) => {
    console.log(path)
    client.rm(path, (error) => {
      if (error) {
        dispatch(showNotification(error.message));

        throw error;
      }

      const payload = removeNode(list, path);

      dispatch(
        showNotification(`"${path}" has successfully removed from server`, 'success'),
      );

      dispatch({
        type: RM,
        payload,
      });

      resolve(payload);
    });
  });
};
