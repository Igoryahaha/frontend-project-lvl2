import _ from 'lodash';
import { getActionType } from '../buildDiff.js';

const setGap = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const currentDepth = depth + 1;
  const allObjKeys = Object.keys(value);
  const res = allObjKeys
    .map((key) => `  ${key}: ${stringify(value[key], currentDepth)}`)
    .join(`\n${setGap(currentDepth)}`);

  return `{\n${setGap(currentDepth)}${res}\n  ${setGap(depth)}}`;
};

const formatDataStylish = (data) => {
  const depthStep = 1;

  const iter = (tree, depth) => tree.map((item) => {
    const { key } = item;

    switch (getActionType(item)) {
      case 'added':
        return `${setGap(depth)}+ ${key}: ${stringify(item.value, depth)}`;
      case 'removed':
        return `${setGap(depth)}- ${key}: ${stringify(item.value, depth)}`;
      case 'updated':
        return `${setGap(depth)}- ${key}: ${stringify(item.updatedValue, depth)}\n${setGap(depth)}+ ${key}: ${stringify(item.value, depth)}`;
      case 'nested':
        return `${setGap(depth)}  ${key}: {\n${iter(item.children, depth + 1).join('\n')}\n  ${setGap(depth)}}`;
      default:
        return `${setGap(depth)}  ${key}: ${stringify(item.value, depth)}`;
    }
  });

  const result = ['{', iter(data, depthStep).join('\n'), '}'];

  return result.join('\n');
};

export default formatDataStylish;
