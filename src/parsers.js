import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export const getFileExtension = (filepath) => path.extname(filepath).slice(1);
export const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const convertData = (data, extension) => {
  const convertFrom = {
    json: JSON.parse,
    yml: yaml.load,
    yaml: yaml.load,
  };

  return convertFrom[extension](data);
};

export default function getData(filepath) {
  const data = readFile(filepath);
  const extension = getFileExtension(filepath);
  return convertData(data, extension);
}
