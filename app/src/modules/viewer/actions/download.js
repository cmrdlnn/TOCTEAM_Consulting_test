export default path => (dispatch, getState) => {
  const { authentication: { client } } = getState();

  return new Promise(() => {
    client.download(path, './', () => {});
  });
};
