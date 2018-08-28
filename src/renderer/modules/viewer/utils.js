export const findNode = (list, path) => {
  const currentPath = path.slice(1);
  const index = list.findIndex(item => item.name === currentPath[0]);

  return [currentPath, index];
};

export const sliceArray = (array, index, ...updates) => ([
  ...array.slice(0, index),
  ...updates,
  ...array.slice(index + 1),
]);
