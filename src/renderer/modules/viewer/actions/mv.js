import { showNotification } from 'modules/notifications';

import { MV } from '../constants';
import { findNode, sliceArray } from '../utils';

const addNode = (list, path, node, newKey) => {
  const [childrenPath, index] = findNode(list, path);

  if (index === -1) return [{ ...node, key: newKey }, ...list];

  const { children, ...other } = list[index];

  return sliceArray(list, index, {
    ...other,
    children: addNode(children, childrenPath, node, newKey),
  });
};

const removeNode = (list, path) => {
  const [childrenPath, index] = findNode(list, path);

  if (childrenPath.length === 1) {
    return [sliceArray(list, index), list[index]];
  }

  const [updates, removedNode] = removeNode(list[index].children, childrenPath);

  return [
    sliceArray(list, index, { ...list[index], children: updates }),
    removedNode,
  ];
};

const match = path => path.match(/^(.*\/)(.+)$/);

export default (from, to, around, isFile) => (dispatch, getState) => {
  const { authentication: { client }, viewer: { list } } = getState();

  return new Promise((resolve) => {
    const filename = match(from)[2];
    let newPath = around || isFile ? match(to)[1] : `${to}/`;

    newPath = `${newPath}${filename}`;

    client.mv(from, newPath, (error) => {
      if (error) {
        dispatch(showNotification(error.message));
        return;
      }

      const [newList, removedNode] = removeNode(list, from.split('/'));

      const payload = addNode(newList, newPath.split('/'), removedNode, newPath);

      dispatch({
        type: MV,
        payload,
      });

      resolve(payload);
    });
  });
};
