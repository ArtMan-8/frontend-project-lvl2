import genDiff from '../src';
import { readFile } from '../src/helpers.js';
import { FORMATER_TYPE } from '../src/formaters';

describe('genDiff from complex file', () => {
  describe.each`
  difftype                  | expected
  ${FORMATER_TYPE.STYLISH}  | ${'diff-stylish.txt'}
  ${FORMATER_TYPE.PLAIN}    | ${'diff-plain.txt'}
  ${FORMATER_TYPE.JSON}     | ${'diff-json.txt'}
`('diff show type $difftype', ({ difftype, expected }) => {
    test.each`
    filename1         | filename2
    ${'file1.json'}   | ${'file2.json'}
    ${'file1.yml'}    | ${'file2.yaml'}
  `('between $file1 $file2', ({ filename1, filename2 }) => {
      const filepath1 = `./__fixtures__/${filename1}`;
      const filepath2 = `./__fixtures__/${filename2}`;
      const diff = readFile(`./__fixtures__/${expected}`);
      expect(genDiff(filepath1, filepath2, difftype)).toBe(diff);
    });
  });
});
