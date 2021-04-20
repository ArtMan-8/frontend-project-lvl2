import { getData } from './parsers.js';

export default (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const keys = new Set([...Object.keys(data1), ...Object.keys(data2)].sort());

  let result = '\n{\n';
  keys.forEach((key) => {
    const isExist1 = key in data1;
    const isExist2 = key in data2;
    const isBothExist = isExist1 && isExist2;

    const isAdded = !isExist1 && isExist2;
    const isRemoved = !isExist2;
    const isSame = isBothExist && data1[key] === data2[key];
    const isUpdated = isBothExist && data1[key] !== data2[key];

    if (isAdded) {
      result += `  + ${key}: ${data2[key]}\n`;
    }

    if (isRemoved) {
      result += `  - ${key}: ${data1[key]}\n`;
    }

    if (isSame) {
      result += `    ${key}: ${data1[key]}\n`;
    }

    if (isUpdated) {
      result += `  - ${key}: ${data1[key]}\n`;
      result += `  + ${key}: ${data2[key]}\n`;
    }
  });

  result += '}\n';
  return result;
};
