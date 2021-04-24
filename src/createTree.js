export const NodeType = {
  ADDED: 'added',
  REMOVED: 'removed',
  EQUAL: 'equal',
  UPDATED: 'updated',
  WITH_CHILDREN: 'with children',
};

const isExist = (key, node) => key in node;
const isAdded = (key, node1, node2) => !isExist(key, node1) && isExist(key, node2);
const isRemoved = (key, node1, node2) => isExist(key, node1) && !isExist(key, node2);
const isEqual = (key, node1, node2) => node1[key] === node2[key];

export const isObject = (item) => (typeof item === 'object' && !Array.isArray(item) && item !== null);

export default function createTree(data1, data2) {
  const keys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)].sort()));

  return keys.map((key) => {
    const newNode = (type) => ({
      key,
      type,
      oldValue: type === NodeType.ADDED ? null : data1[key],
      newValue: type === NodeType.REMOVED ? null : data2[key],
    });

    if (isAdded(key, data1, data2)) {
      return newNode(NodeType.ADDED);
    }

    if (isRemoved(key, data1, data2)) {
      return newNode(NodeType.REMOVED);
    }

    if (isEqual(key, data1, data2)) {
      return newNode(NodeType.EQUAL);
    }

    return newNode(NodeType.UPDATED);
  });
}
