import * as fs from 'fs';
import * as path from 'path';
import getDiff from './buildDiff.js';
import formatDiff from './formatDiff.js';
import parser from './parsers.js';

const readFile = (file) => {
  const filePath = path.isAbsolute(file)
    ? file
    : path.resolve(process.cwd(), file);
  const fileType = path.extname(filePath).slice(1);
  return parser(fs.readFileSync(filePath, 'utf8'), fileType);
};

const genDiff = (file1, file2) => {
  const data = getDiff(readFile(file1), readFile(file2));
  return formatDiff(data);
};

export default genDiff;
