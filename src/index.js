import * as fs from 'fs';
import * as path from 'path';
import getDiff from './buildDiff.js';
import formatDiff from './formatDiff.js';

const readFile = (file) => {
  const filePath = path.isAbsolute(file)
    ? file
    : path.resolve(process.cwd(), file);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const genDiff = (file1, file2) => {
  const data = getDiff(readFile(file1), readFile(file2));
  return formatDiff(data);
};

export default genDiff;
