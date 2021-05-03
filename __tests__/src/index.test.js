import { fileURLToPath } from 'url';
import path from 'path';

import genDiff from '../../src';
import { readFile } from '../../src/parsers.js';
import { FormaterTypes } from '../../src/formaters';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '../..', '__fixtures__', filename);

describe('genDiff from simple file', () => {
  describe(`${FormaterTypes.STYLISH} format`, () => {
    test('json', () => {
      const file1 = getFixturePath('simple-file-1.json');
      const file2 = getFixturePath('simple-file-2.json');
      const diff = readFile(getFixturePath('simple-file-diff-stylish.txt'));
      expect(genDiff(file1, file2, FormaterTypes.STYLISH)).toBe(diff);
    });

    test('yaml', () => {
      const file1 = getFixturePath('simple-file-1.yml');
      const file2 = getFixturePath('simple-file-2.yaml');
      const diff = readFile(getFixturePath('simple-file-diff-stylish.txt'));
      expect(genDiff(file1, file2, FormaterTypes.STYLISH)).toBe(diff);
    });
  });
});

describe('genDiff from complex file', () => {
  describe(`${FormaterTypes.STYLISH} format`, () => {
    test('json', () => {
      const file1 = getFixturePath('complex-file-1.json');
      const file2 = getFixturePath('complex-file-2.json');
      const diff = readFile(getFixturePath('complex-file-diff-stylish.txt'));
      expect(genDiff(file1, file2, FormaterTypes.STYLISH)).toBe(diff);
    });

    test('yaml', () => {
      const file1 = getFixturePath('complex-file-1.yml');
      const file2 = getFixturePath('complex-file-2.yaml');
      const diff = readFile(getFixturePath('complex-file-diff-stylish.txt'));
      expect(genDiff(file1, file2, FormaterTypes.STYLISH)).toBe(diff);
    });
  });

  describe(`${FormaterTypes.PLAIN} format`, () => {
    test('json', () => {
      const file1 = getFixturePath('complex-file-1.json');
      const file2 = getFixturePath('complex-file-2.json');
      const diff = readFile(getFixturePath('complex-file-diff-plain.txt'));
      expect(genDiff(file1, file2, FormaterTypes.PLAIN)).toBe(diff);
    });

    test('yaml', () => {
      const file1 = getFixturePath('complex-file-1.yml');
      const file2 = getFixturePath('complex-file-2.yaml');
      const diff = readFile(getFixturePath('complex-file-diff-plain.txt'));
      expect(genDiff(file1, file2, FormaterTypes.PLAIN)).toBe(diff);
    });
  });

  describe(`${FormaterTypes.JSON} format`, () => {
    test('json', () => {
      const file1 = getFixturePath('complex-file-1.json');
      const file2 = getFixturePath('complex-file-2.json');
      const diff = readFile(getFixturePath('complex-file-diff-json.txt'));
      expect(genDiff(file1, file2, FormaterTypes.JSON)).toBe(diff);
    });

    test('yaml', () => {
      const file1 = getFixturePath('complex-file-1.yml');
      const file2 = getFixturePath('complex-file-2.yaml');
      const diff = readFile(getFixturePath('complex-file-diff-json.txt'));
      expect(genDiff(file1, file2, FormaterTypes.JSON)).toBe(diff);
    });
  });
});
