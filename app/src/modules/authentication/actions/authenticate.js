import EasyFtp from 'easy-ftp';

import { ADD_ERROR, AUTHENTICATE } from '../constants';
import { NEXT_STEP } from '../../step/constants';

export default credentials => (dispatch) => {
  const easyFTP = new EasyFtp();

  easyFTP.connect(credentials);
  easyFTP.client.client.on('error', (err) => {
    dispatch({
      type: ADD_ERROR,
      payload: err,
    });
  });
  easyFTP.client.on('ready', () => {
    dispatch({
      type: AUTHENTICATE,
      payload: easyFTP,
    });
    dispatch({ type: NEXT_STEP });
  });
};
