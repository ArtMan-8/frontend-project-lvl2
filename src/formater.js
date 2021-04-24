import { NodeType } from './createTree.js';

export const FormaterTypes = {
  STYLISH: 'stylish',
};

export default function formater(tree, formatType) {
  let result = '{\n';

  for (const [key, node] of Object.entries(tree)) {
    switch (node.type) {
      case NodeType.ADDED:
        result += `  + ${key}: ${node.newValue}\n`;
        break;
      case NodeType.REMOVED:
        result += `  - ${key}: ${node.oldValue}\n`;
        break;
      case NodeType.SAME:
        result += `    ${key}: ${node.newValue}\n`;
        break;
      case NodeType.UPDATED:
        result += `  - ${key}: ${node.oldValue}\n`;
        result += `  + ${key}: ${node.newValue}\n`;
        break;
      default: throw new Error(`Unknown ${node.type}`);
    }
  }

  result += '}';
  return result;
}
