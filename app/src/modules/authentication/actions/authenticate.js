import EasyFtp from 'easy-ftp';

import { ADD_ERROR, AUTHENTICATE, LOADING } from '../constants';

export default credentials => (dispatch) => {
  dispatch({ type: LOADING });

  const easyFTP = new EasyFtp();

  return new Promise((resolve) => {
    easyFTP.connect(credentials);

    const { host, port, type } = credentials;
    const clientForError = type === 'ftp' ? easyFTP.client.client : easyFTP;

    clientForError.on('error', (err) => {
      dispatch({
        type: ADD_ERROR,
        payload: err,
      });

      throw err;
    });


    easyFTP.client.on('ready', () => {
      const payload = { client: easyFTP, url: `${type}://${host}:${port}` };

      dispatch({
        type: AUTHENTICATE,
        payload,
      });

      resolve(easyFTP);
    });
  });
};
