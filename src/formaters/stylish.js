import { NodeType } from '../createTree.js';

const INDENT = 1;
const getIndent = (depth) => ' '.repeat(INDENT * depth);

export default function getStylishTree(tree) {
  const stylishTree = (nodes, indent) => nodes.map((node) => {
    switch (node.type) {
      case NodeType.ADDED:
        return `${getIndent(indent)}+ ${node.key}: ${node.newValue}\n`;
      case NodeType.REMOVED:
        return `${getIndent(indent)}- ${node.key}: ${node.oldValue}\n`;
      case NodeType.EQUAL:
        return `${getIndent(indent + 2)}${node.key}: ${node.newValue}\n`;
      case NodeType.UPDATED:
        return `${getIndent(indent)}- ${node.key}: ${node.oldValue}\n${getIndent(indent)}+ ${node.key}: ${node.newValue}\n`;
      default: throw new Error(`Unknown ${node.type}`);
    }
  });

  return `{\n${stylishTree(tree, 2).join('')}}`;
}
