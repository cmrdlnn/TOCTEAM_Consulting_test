import { showNotification } from 'modules/notifications';

import { LS } from '../constants';
import { findNode, sliceArray } from '../utils';

const addChildren = (list, path, childrenList) => {
  const [childrenPath, index] = findNode(list, path);
  const { children, ...parent } = list[index];

  return sliceArray(list, index, {
    ...parent,
    children: children
      ? addChildren(children, childrenPath, childrenList)
      : childrenList,
  });
};

export default path => (dispatch, getState) => {
  const { authentication: { client }, viewer: { list } } = getState();

  return new Promise((resolve) => {
    client.ls(path || '/', (error, items) => {
      if (error) {
        dispatch(showNotification(error.message));
        return;
      }

      let payload = items.map(item => ({
        ...item,
        key: `${path || ''}/${item.name}`,
        isLeaf: item.type !== 'd',
      }));

      if (path) {
        payload = addChildren(list, path.split('/'), payload);
      }

      dispatch({
        type: LS,
        payload,
      });

      resolve(payload);
    });
  });
};
