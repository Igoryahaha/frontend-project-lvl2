import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(`${getFixturePath(filename)}`, 'utf-8').trim();

const flatOutputResult = readFixture('flatOutput.txt');
const stylishOutputResult = readFixture('stylishOutput.txt');
const plainOutputResult = readFixture('plainOutput.txt');
const jsonOutputResult = readFixture('jsonOutput.txt');

test('genDiff, flat JSON files', () => {
  const getDiffResultJson = genDiff(getFixturePath('flatFile1.json'), getFixturePath('flatFile2.json'));
  expect(getDiffResultJson).toBe(flatOutputResult);
});

test('genDiff, JSON files', () => {
  const getDiffResultJson = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(getDiffResultJson).toBe(stylishOutputResult);
});

test('genDiff, YML files', () => {
  const getDiffResultJson = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(getDiffResultJson).toBe(stylishOutputResult);
});

test('genDiff plain, JSON files', () => {
  const getDiffResultJson = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(getDiffResultJson).toBe(plainOutputResult);
});

test('genDiff plain, YML files', () => {
  const getDiffResultJson = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
  expect(getDiffResultJson).toBe(plainOutputResult);
});

test('genDiff json, JSON files', () => {
  const getDiffResultJson = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expect(getDiffResultJson).toBe(jsonOutputResult);
});

test('genDiff json, YML files', () => {
  const getDiffResultJson = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json');
  expect(getDiffResultJson).toBe(jsonOutputResult);
});
