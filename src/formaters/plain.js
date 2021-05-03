import _ from 'lodash';
import { NodeType } from '../createTree.js';

const getValueString = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return _.isObject(value) ? '[complex value]' : `${value}`;
};

export default function getPlainTree(tree) {
  const plainTree = (nodes, parent) => {
    const changedNodes = nodes.filter((node) => node.type !== NodeType.EQUAL);

    return changedNodes.map((node) => {
      const property = parent ? `${parent}.${node.key}` : node.key;

      switch (node.type) {
        case NodeType.ADDED: {
          return `Property '${property}' was added with value: ${getValueString(node.newValue)}`;
        }
        case NodeType.REMOVED: {
          return `Property '${property}' was removed`;
        }
        case NodeType.UPDATED: {
          return `Property '${property}' was updated. From ${getValueString(node.oldValue)} to ${getValueString(node.newValue)}`;
        }
        case NodeType.WITH_CHILDREN: {
          return plainTree(node.children, property);
        }
        default: throw new Error(`Unknown ${node.type}`);
      }
    }).join('\n');
  };

  return plainTree(tree);
}
