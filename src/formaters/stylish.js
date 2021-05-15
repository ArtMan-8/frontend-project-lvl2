import _ from 'lodash';
import { NODE_TYPE } from '../createTree.js';

const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth + spacesCount);

const stringify = (someEntity, indentCount) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) return `${currentValue}`;

    const lines = Object
      .entries(currentValue)
      .map(([key, value]) => `${getIndent(depth + 4)}${key}: ${iter(value, depth + 4)}`);

    return [
      '{',
      ...lines,
      `${getIndent(depth)}}`,
    ].join('\n');
  };

  return iter(someEntity, indentCount);
};

export default function formatToStylish(tree) {
  const stylishTree = (nodes, depth) => nodes.map((node) => {
    const getValueString = (value, sign) => `${getIndent(depth - 2)}${sign}${node.key}: ${stringify(value, depth)}\n`;

    switch (node.type) {
      case NODE_TYPE.ADDED: {
        return getValueString(node.value2, '+ ');
      }
      case NODE_TYPE.REMOVED: {
        return getValueString(node.value1, '- ');
      }
      case NODE_TYPE.EQUAL: {
        return getValueString(node.value2, '  ');
      }
      case NODE_TYPE.UPDATED: {
        return `${getValueString(node.value1, '- ')}${getValueString(node.value2, '+ ')}`;
      }
      case NODE_TYPE.WITH_CHILDREN:
        return `${getIndent(depth)}${node.key}: {\n${stylishTree(node.children, depth + 4).join('')}${getIndent(depth)}}\n`;
      default: throw new Error(`Unknown ${node.type}`);
    }
  });

  return `{\n${stylishTree(tree, 0).join('')}}`;
}
