import _ from 'lodash';
import { NODE_TYPE } from '../createTree.js';

const getValueString = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return _.isObject(value) ? '[complex value]' : `${value}`;
};

export default function getPlainTree(tree) {
  const plainTree = (nodes, parent) => {
    const changedNodes = nodes.filter((node) => node.type !== NODE_TYPE.EQUAL);

    return changedNodes.map((node) => {
      const property = parent ? `${parent}.${node.key}` : node.key;

      switch (node.type) {
        case NODE_TYPE.ADDED: {
          return `Property '${property}' was added with value: ${getValueString(node.newValue)}`;
        }
        case NODE_TYPE.REMOVED: {
          return `Property '${property}' was removed`;
        }
        case NODE_TYPE.UPDATED: {
          return `Property '${property}' was updated. From ${getValueString(node.oldValue)} to ${getValueString(node.newValue)}`;
        }
        case NODE_TYPE.WITH_CHILDREN: {
          return plainTree(node.children, property);
        }
        default: throw new Error(`Unknown ${node.type}`);
      }
    }).join('\n');
  };

  return plainTree(tree);
}
