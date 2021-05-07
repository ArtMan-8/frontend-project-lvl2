import createTree from './createTree.js';
import formater, { FORMATER_TYPE } from './formaters/index.js';
import { getFile } from './parser/helpers.js';
import parseData from './parser/index.js';

export default function genDiff(filepath1, filepath2, formatType = FORMATER_TYPE.STYLISH) {
  const file1 = getFile(filepath1);
  const file2 = getFile(filepath2);

  const data1 = parseData(file1);
  const data2 = parseData(file2);

  const tree = createTree(data1, data2);
  return formater(tree, formatType);
}
