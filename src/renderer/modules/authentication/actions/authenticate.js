import EasyFtp from 'easy-ftp';

import { ADD_ERROR, AUTHENTICATE, LOADING } from '../constants';

const ERRORS = {
  ECONNREFUSED: 'The server you are calling refused to connect',
  EINVAL: 'Invalid server address',
  ENOTFOUND: 'Сould not find the given address',
  EAI_AGAIN: 'Cannot resolve host address',
};

export default credentials => (dispatch) => {
  dispatch({ type: LOADING });

  const easyFTP = new EasyFtp();

  return new Promise((resolve) => {
    easyFTP.connect(credentials);

    const { host, port, type } = credentials;
    const clientsForError = [easyFTP];

    if (type === 'ftp') clientsForError.push(easyFTP.client.client);

    clientsForError.forEach((client) => {
      client.on('error', (err) => {
        dispatch({
          type: ADD_ERROR,
          payload: ERRORS[err.code] || err.message,
        });

        throw err;
      });
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
