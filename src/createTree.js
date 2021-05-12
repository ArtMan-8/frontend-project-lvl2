import _ from 'lodash';

export const NODE_TYPE = {
  ADDED: 'added',
  REMOVED: 'removed',
  EQUAL: 'equal',
  UPDATED: 'updated',
  WITH_CHILDREN: 'withChildren',
};

export default function createTree(data1, data2) {
  const uniqKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(uniqKeys);

  return sortedKeys.map((key) => {
    const newNode = (type) => ({
      key,
      type,
      value1: data1[key] ?? null,
      value2: data2[key] ?? null,
    });

    if (!_.has(data1, key)) {
      return newNode(NODE_TYPE.ADDED);
    }

    if (!_.has(data2, key)) {
      return newNode(NODE_TYPE.REMOVED);
    }

    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        type: NODE_TYPE.WITH_CHILDREN,
        children: createTree(data1[key], data2[key]),
      };
    }

    if (!_.isEqual(data1[key], data2[key])) {
      return newNode(NODE_TYPE.UPDATED);
    }

    return newNode(NODE_TYPE.EQUAL);
  });
}
