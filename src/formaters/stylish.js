import _ from 'lodash';
import { NODE_TYPE } from '../createTree.js';

const getIndent = (multiplay) => ' '.repeat(multiplay);

const getLineFromObject = (object, indent) => {
  const stylishObject = (obj) => Object.entries(obj).map(([key, value]) => (_.isObject(value)
    ? `${getIndent(indent + 4)}${key}: ${getLineFromObject(value, indent + 4)}\n`
    : `${getIndent(indent + 4)}${key}: ${value}\n`)).join('');

  return `{\n${stylishObject(object)}${getIndent(indent)}}`;
};

const getValue = (value, indent) => (_.isObject(value)
  ? getLineFromObject(value, indent + 2)
  : value);

export default function getStylishTree(tree) {
  const stylishTree = (nodes, indent) => nodes.map((node) => {
    const getValue2String = (value) => `${getIndent(indent)}+ ${node.key}: ${getValue(value, indent)}\n`;
    const getValue1String = (value) => `${getIndent(indent)}- ${node.key}: ${getValue(value, indent)}\n`;
    const getEqualValueString = (value) => `${getIndent(indent + 2)}${node.key}: ${getValue(value, indent)}\n`;

    switch (node.type) {
      case NODE_TYPE.ADDED: {
        return getValue2String(node.value2);
      }
      case NODE_TYPE.REMOVED: {
        return getValue1String(node.value1);
      }
      case NODE_TYPE.EQUAL: {
        return getEqualValueString(node.value2);
      }
      case NODE_TYPE.UPDATED: {
        return `${getValue1String(node.value1)}${getValue2String(node.value2)}`;
      }
      case NODE_TYPE.WITH_CHILDREN:
        return `${getIndent(indent + 2)}${node.key}: {\n${stylishTree(node.children, indent + 4).join('')}${getIndent(indent + 2)}}\n`;
      default: throw new Error(`Unknown ${node.type}`);
    }
  });

  return `{\n${stylishTree(tree, 2).join('')}}`;
}
