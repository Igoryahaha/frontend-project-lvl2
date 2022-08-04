import * as fs from 'fs';
import * as path from 'path';
import getDiff from './buildDiff.js';
import getFormattedData from './formatters/index.js';
import parser from './parsers.js';

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

const getResolvedFilePath = (filePath) => path.resolve(filePath);

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const resolvedFilePath1 = getResolvedFilePath(filePath1);
  const resolvedFilePath2 = getResolvedFilePath(filePath2);

  const fileType1 = path.extname(resolvedFilePath1).slice(1);
  const fileType2 = path.extname(resolvedFilePath2).slice(1);

  const dataFile1 = parser(readFile(resolvedFilePath1), fileType1);
  const dataFile2 = parser(readFile(resolvedFilePath2), fileType2);

  const diff = getDiff(dataFile1, dataFile2);
  return getFormattedData(diff, formatName);
};

export default genDiff;
