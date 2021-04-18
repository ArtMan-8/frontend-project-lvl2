import { readFileSync } from 'fs';
import chalk from 'chalk';

const genDiff = (filepath1, filepath2) => {
  const data1 = readFileSync(filepath1, 'utf-8');
  const data2 = readFileSync(filepath2, 'utf-8');

  const json1 = JSON.parse(data1);
  const json2 = JSON.parse(data2);

  const keys = new Set([...Object.keys(json1), ...Object.keys(json2)].sort());

  let result = chalk`{yellow \n{\n}`;
  keys.forEach((key) => {
    const isExist1 = key in json1;
    const isExist2 = key in json2;
    const isBothExist = isExist1 && isExist2;

    const isAdded = !isExist1 && isExist2;
    const isRemoved = !isExist2;
    const isSame = isBothExist && json1[key] === json2[key];
    const isUpdated = isBothExist && json1[key] !== json2[key];

    if (isAdded) {
      result += chalk`{green   + ${key}: ${json2[key]}\n}`;
    }

    if (isRemoved) {
      result += chalk`{red   - ${key}: ${json1[key]}\n}`;
    }

    if (isSame) {
      result += chalk`{yellow     ${key}: ${json1[key]}\n}`;
    }

    if (isUpdated) {
      result += chalk`{red   - ${key}: ${json1[key]}\n}`;
      result += chalk`{green   + ${key}: ${json2[key]}\n}`;
    }
  });

  return chalk`{yellow ${result}\}}`;
};

export default genDiff;
