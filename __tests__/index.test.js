import { fileURLToPath } from 'url';
import path from 'path';

import genDiff from '../src';
import { readFile } from '../src/parser/helpers.js';
import { FORMATER_TYPE } from '../src/formaters';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, '../.', '__fixtures__', filename);

describe('genDiff from complex file', () => {
  describe.each`
  difftype                  | expected
  ${FORMATER_TYPE.STYLISH}  | ${'diff-stylish.txt'}
  ${FORMATER_TYPE.PLAIN}    | ${'diff-plain.txt'}
  ${FORMATER_TYPE.JSON}     | ${'diff-json.txt'}
`('diff show type $difftype', ({ difftype, expected }) => {
    test.each`
    file1             | file2
    ${'file1.json'}   | ${'file2.json'}
    ${'file1.yml'}    | ${'file2.yaml'}
  `('between $file1 $file2', ({ file1, file2 }) => {
      const filepath1 = getFixturePath(file1);
      const filepath2 = getFixturePath(file2);
      const diff = readFile(getFixturePath(expected));
      expect(genDiff(filepath1, filepath2, difftype)).toBe(diff);
    });
  });
});
