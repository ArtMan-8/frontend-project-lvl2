import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export const getFileExtension = (filepath) => path.extname(filepath).slice(1);

export const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

export const convertData = (data, extension) => {
  const convertFrom = {
    json() {
      return JSON.parse(data);
    },
    yml() {
      return yaml.load(data);
    },
    yaml() {
      return yaml.load(data);
    },
  };

  return convertFrom[extension]();
};

export const getData = (filepath) => {
  const data = readFile(filepath);
  const extension = getFileExtension(filepath);
  return convertData(data, extension);
};
