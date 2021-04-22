import { fileURLToPath } from 'url';
import path from 'path';

import genDiff from '../../src/index.js';
import { readFile } from '../../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '../..', '__fixtures__', filename);

describe('genDiff from simple file', () => {
  test('json', () => {
    const file1 = getFixturePath('simple-file-1.json');
    const file2 = getFixturePath('simple-file-2.json');
    const diff = readFile(getFixturePath('simple-file-diff-stylish.txt'));

    expect(genDiff(file1, file2)).toBe(diff);
  });

  test('yaml', () => {
    const file1 = getFixturePath('simple-file-1.yml');
    const file2 = getFixturePath('simple-file-2.yaml');
    const diff = readFile(getFixturePath('simple-file-diff-stylish.txt'));

    expect(genDiff(file1, file2)).toBe(diff);
  });
});
