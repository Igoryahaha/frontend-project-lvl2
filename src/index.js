import * as fs from 'fs';
import * as path from 'path';
import getDiff from './buildDiff.js';
import getFormattedData from './formatters/index.js';
import parser from './parsers.js';

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

const getFilePath = (file) => path.resolve(file);

const genDiff = (file1, file2, formatName = 'stylish') => {
  const filePath1 = getFilePath(file1);
  const filePath2 = getFilePath(file2);

  const fileType1 = path.extname(filePath1).slice(1);
  const fileType2 = path.extname(filePath2).slice(1);

  const dataFile1 = parser(readFile(filePath1), fileType1);
  const dataFile2 = parser(readFile(filePath2), fileType2);

  const data = getDiff(dataFile1, dataFile2);
  return getFormattedData(data, formatName);
};

export default genDiff;
