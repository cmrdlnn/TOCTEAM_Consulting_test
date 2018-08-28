import { showNotification } from 'modules/notifications';

export default path => (dispatch, getState) => {
  const { authentication: { client } } = getState();

  return new Promise((resolve) => {
    client.download(path, './', (error) => {
      if (error) {
        dispatch(showNotification(error.message));

        throw error;
      }

      const downloaded = path.match(/^.*\/(.+)$/)[1];

      dispatch(
        showNotification(
          `"${downloaded}" has successfully downloaded to application directory`,
          'success',
        ),
      );

      resolve();
    });
  });
};
