import { showNotification } from 'modules/notifications';

export default (serverPath, fsPath) => (dispatch, getState) => {
  const { authentication: { client } } = getState();

  return new Promise((resolve) => {
    client.download(serverPath, fsPath, (error) => {
      if (error) {
        dispatch(showNotification(error.message));

        throw error;
      }

      const downloaded = serverPath.match(/^.*\/(.+)$/)[1];

      dispatch(
        showNotification(
          `"${downloaded}" has successfully downloaded to ${fsPath}`,
          'success',
        ),
      );

      resolve();
    });
  });
};
