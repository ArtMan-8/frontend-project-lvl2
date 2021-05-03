import _ from 'lodash';
import { NodeType } from '../createTree.js';

const getIndent = (multiplay) => ' '.repeat(multiplay);

const getLineFromObject = (object, indent) => {
  const stylishObject = (obj) => Object.entries(obj).map(([key, value]) => (_.isObject(value)
    ? `${getIndent(indent + 4)}${key}: ${getLineFromObject(value, indent + 4)}\n`
    : `${getIndent(indent + 4)}${key}: ${value}\n`)).join('');

  return `{\n${stylishObject(object)}${getIndent(indent)}}`;
};

export default function getStylishTree(tree) {
  const stylishTree = (nodes, indent) => nodes.map((node) => {
    const getValue = (value) => (_.isObject(value)
      ? getLineFromObject(value, indent + 2)
      : value);

    const getNewValueString = (value) => `${getIndent(indent)}+ ${node.key}: ${getValue(value)}\n`;
    const getOldValueString = (value) => `${getIndent(indent)}- ${node.key}: ${getValue(value)}\n`;
    const getEqualValueString = (value) => `${getIndent(indent + 2)}${node.key}: ${getValue(value)}\n`;

    switch (node.type) {
      case NodeType.ADDED: {
        return getNewValueString(node.newValue);
      }
      case NodeType.REMOVED: {
        return getOldValueString(node.oldValue);
      }
      case NodeType.EQUAL: {
        return getEqualValueString(node.newValue);
      }
      case NodeType.UPDATED: {
        return `${getOldValueString(node.oldValue)}${getNewValueString(node.newValue)}`;
      }
      case NodeType.WITH_CHILDREN:
        return `${getIndent(indent + 2)}${node.key}: {\n${stylishTree(node.children, indent + 4).join('')}${getIndent(indent + 2)}}\n`;
      default: throw new Error(`Unknown ${node.type}`);
    }
  });

  return `{\n${stylishTree(tree, 2).join('')}}`;
}
