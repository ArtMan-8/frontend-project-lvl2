import { readFileSync } from 'fs';

const readFile = (filepath) => readFileSync(filepath, 'utf-8');
const toJSON = (data) => JSON.parse(data);

const genDiff = (data1, data2) => {
  const json1 = toJSON(data1);
  const json2 = toJSON(data2);

  const keys = new Set([...Object.keys(json1), ...Object.keys(json2)].sort());

  let result = '\n{\n';
  keys.forEach((key) => {
    const isExist1 = key in json1;
    const isExist2 = key in json2;
    const isBothExist = isExist1 && isExist2;

    const isAdded = !isExist1 && isExist2;
    const isRemoved = !isExist2;
    const isSame = isBothExist && json1[key] === json2[key];
    const isUpdated = isBothExist && json1[key] !== json2[key];

    if (isAdded) {
      result += `  + ${key}: ${json2[key]}\n`;
    }

    if (isRemoved) {
      result += `  - ${key}: ${json1[key]}\n`;
    }

    if (isSame) {
      result += `    ${key}: ${json1[key]}\n`;
    }

    if (isUpdated) {
      result += `  - ${key}: ${json1[key]}\n`;
      result += `  + ${key}: ${json2[key]}\n`;
    }
  });

  result += '}\n';
  return result;
};

export { readFile, toJSON };
export default genDiff;
