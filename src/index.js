import createTree from './createTree.js';
import format, { FORMATER_TYPE } from './formaters/index.js';
import { getFile } from './helpers.js';
import parseData from './parser.js';

export default function genDiff(filepath1, filepath2, formatType = FORMATER_TYPE.STYLISH) {
  const { data: fileData1, extension: fileExtension1 } = getFile(filepath1);
  const { data: fileData2, extension: fileExtension2 } = getFile(filepath2);

  const data1 = parseData(fileData1, fileExtension1);
  const data2 = parseData(fileData2, fileExtension2);

  const tree = createTree(data1, data2);
  return format(tree, formatType);
}
