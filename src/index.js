import createTree from './createTree.js';
import formater, { FormaterTypes } from './formaters/index.js';
import getData from './parsers.js';

export default function genDiff(filepath1, filepath2, formatType = FormaterTypes.STYLISH) {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const tree = createTree(data1, data2);
  return formater(tree, formatType);
}
