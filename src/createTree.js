import _ from 'lodash';

export const NodeType = {
  ADDED: 'added',
  REMOVED: 'removed',
  EQUAL: 'equal',
  UPDATED: 'updated',
  WITH_CHILDREN: 'withChildren',
};

const isAdded = (key, node1, node2) => !_.has(node1, key) && _.has(node2, key);
const isRemoved = (key, node1, node2) => _.has(node1, key) && !_.has(node2, key);
const isEqual = (key, node1, node2) => node1[key] === node2[key];

export default function createTree(oldNodes, newNodes) {
  const uniqKeys = _.union(Object.keys(oldNodes), Object.keys(newNodes));
  const sortedKeys = _.sortBy(uniqKeys);

  return sortedKeys.map((key) => {
    const newNode = (type) => ({
      key,
      type,
      oldValue: oldNodes[key] ?? null,
      newValue: newNodes[key] ?? null,
    });

    if (_.isObject(oldNodes[key]) && _.isObject(newNodes[key])) {
      return {
        key,
        type: NodeType.WITH_CHILDREN,
        children: createTree(oldNodes[key], newNodes[key]),
      };
    }

    if (isEqual(key, oldNodes, newNodes)) {
      return newNode(NodeType.EQUAL);
    }

    if (isAdded(key, oldNodes, newNodes)) {
      return newNode(NodeType.ADDED);
    }

    if (isRemoved(key, oldNodes, newNodes)) {
      return newNode(NodeType.REMOVED);
    }

    return newNode(NodeType.UPDATED);
  });
}
