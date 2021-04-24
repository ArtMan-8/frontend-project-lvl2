export const NodeType = {
  ADDED: 'added',
  REMOVED: 'removed',
  SAME: 'same',
  UPDATED: 'updated',
};

const isExist = (key, node) => key in node;
const isBothExist = (key, node1, node2) => isExist(key, node1) && isExist(key, node2);

const isAdded = (key, node1, node2) => !isExist(key, node1) && isExist(key, node2);
const isRemoved = (key, node1, node2) => isExist(key, node1) && !isExist(key, node2);
const isSame = (key, node1, node2) => isBothExist(key, node1, node2) && node1[key] === node2[key];
const isUpdated = (key, node1, node2) => (
  isBothExist(key, node1, node2) && node1[key] !== node2[key]
);

export default function createTree(data1, data2) {
  const keys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)].sort()));

  return keys.reduce((node, key) => {
    const newNode = (type) => ({
      ...node,
      [key]: {
        type,
        oldValue: type === NodeType.ADDED ? null : data1[key],
        newValue: type === NodeType.REMOVED ? null : data2[key],
      },
    });

    if (isAdded(key, data1, data2)) {
      return newNode(NodeType.ADDED);
    }

    if (isRemoved(key, data1, data2)) {
      return newNode(NodeType.REMOVED);
    }

    if (isSame(key, data1, data2)) {
      return newNode(NodeType.SAME);
    }

    if (isUpdated(key, data1, data2)) {
      return newNode(NodeType.UPDATED);
    }

    return { ...node };
  }, {});
}
