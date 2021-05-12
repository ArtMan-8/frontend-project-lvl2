import fs from 'fs';
import path from 'path';

export const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');
const getFileExtension = (filepath) => path.extname(filepath).slice(1);

export const getFile = (filepath) => ({
  data: readFile(filepath),
  extension: getFileExtension(filepath),
});
