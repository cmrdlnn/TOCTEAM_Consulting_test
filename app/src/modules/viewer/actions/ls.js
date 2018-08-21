import { LS } from '../constants';

const addChildren = (list, pos, childrenList) => {
  const childrenPos = pos.slice(1);
  const name = childrenPos[0];
  const index = list.findIndex(listItem => listItem.name === name);
  const { children, ...parent } = list[index];

  const updatedItem = {
    ...parent,
    children: children
      ? addChildren(children, childrenPos, childrenList)
      : childrenList,
  };

  return [...list.slice(0, index), updatedItem, ...list.slice(index + 1)];
};

export default pos => (dispatch, getState) => {
  const { authentication: { client }, viewer: { list } } = getState();

  return new Promise((resolve) => {
    client.ls(pos || '/', (error, items) => {
      let payload = items.map(item => ({
        ...item,
        key: `${pos || ''}/${item.name}`,
        isLeaf: item.type !== 'd',
      }));

      if (pos) {
        payload = addChildren(list, pos.split('/'), payload);
      }

      dispatch({
        type: LS,
        payload,
      });

      resolve(payload);
    });
  });
};
