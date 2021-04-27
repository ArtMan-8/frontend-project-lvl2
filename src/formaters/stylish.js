import { isObject, NodeType } from '../createTree.js';

const getIndent = (multiplay) => ' '.repeat(multiplay);

const getLineFromObject = (object, indent) => {
  const stylishObject = (obj) => {
    let result = '';
    for (const [key, value] of Object.entries(obj)) {
      result += isObject(value)
        ? `${getIndent(indent + 4)}${key}: ${getLineFromObject(value, indent + 4)}\n`
        : `${getIndent(indent + 4)}${key}: ${value}\n`;
    }

    return result;
  };

  return `{\n${stylishObject(object)}${getIndent(indent)}}`;
};

export default function getStylishTree(tree) {
  const stylishTree = (nodes, indent) => nodes.map((node) => {
    switch (node.type) {
      case NodeType.ADDED: {
        const value = isObject(node.newValue)
          ? getLineFromObject(node.newValue, indent + 2)
          : node.newValue;
        return `${getIndent(indent)}+ ${node.key}: ${value}\n`;
      }
      case NodeType.REMOVED: {
        const value = isObject(node.oldValue)
          ? getLineFromObject(node.oldValue, indent + 2)
          : node.oldValue;
        return `${getIndent(indent)}- ${node.key}: ${value}\n`;
      }
      case NodeType.EQUAL: {
        const value = isObject(node.newValue)
          ? getLineFromObject(node.newValue, indent + 2)
          : node.newValue;
        return `${getIndent(indent + 2)}${node.key}: ${value}\n`;
      }
      case NodeType.UPDATED: {
        const oldValue = isObject(node.oldValue)
          ? getLineFromObject(node.oldValue, indent + 2)
          : node.oldValue;

        const newValue = isObject(node.newValue)
          ? getLineFromObject(node.newValue, indent + 2)
          : node.newValue;

        const oldLine = `${getIndent(indent)}- ${node.key}: ${oldValue}`;
        const newLine = `${getIndent(indent)}+ ${node.key}: ${newValue}`;

        return `${oldLine}\n${newLine}\n`;
      }
      case NodeType.WITH_CHILDREN:
        return `${getIndent(indent + 2)}${node.key}: {\n${stylishTree(node.children, indent + 4).join('')}${getIndent(indent + 2)}}\n`;
      default: throw new Error(`Unknown ${node.type}`);
    }
  });

  return `{\n${stylishTree(tree, 2).join('')}}`;
}
