import { fileURLToPath } from 'url';
import path from 'path';

import genDiff, { readFile } from '../../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '../..', '__fixtures__', filename);

test('genDiff from simle json', () => {
  const file1 = readFile(getFixturePath('file1.json'));
  const file2 = readFile(getFixturePath('file2.json'));
  const diff = readFile(getFixturePath('diff.txt'));

  expect(genDiff(file1, file2)).toBe(diff);
});
