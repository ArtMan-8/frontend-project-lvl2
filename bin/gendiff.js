#!/usr/bin/env node
import { Command } from 'commander';
import genDiff, { readFile } from '../src/index.js';

const program = new Command();
program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const file1 = readFile(filepath1);
    const file2 = readFile(filepath2);
    console.log(genDiff(file1, file2));
  })
  .parse(process.argv);
