import { test, expect } from '@jest/globals';
import fs from 'fs';
import genDiff from '../index.js';

const fixturesPaths = {
  json: ['./__fixtures__/file1.json', './__fixtures__/file2.json'],
  yml: ['./__fixtures__/file1.yml', './__fixtures__/file2.yml'],
};
const output = (formater) => fs.readFileSync(`./__fixtures__/output_${formater}.txt`, 'utf-8').trim();

test.each([
  { formater: 'stylish', ext: 'json' },
  { formater: 'stylish', ext: 'yml' },
  { formater: 'plain', ext: 'json' },
  { formater: 'plain', ext: 'yml' },
  { formater: 'json', ext: 'json' },
])('check formater - "$formater" ext - "$ext"', ({ formater, ext }) => {
  expect(genDiff(fixturesPaths[ext][0], fixturesPaths[ext][1], formater))
    .toBe(output(formater));
});
