import { getActionType } from '../buildDiff.js';

const setGap = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth - 2);

const formatObjectToString = (obj, depth, depthStep) => {
  const result = Object.entries(obj).map(([key, value]) => {
    if (typeof value === 'object') {
      return `${setGap(depth + depthStep)}  ${key}: ${formatObjectToString(
        value,
        depth + depthStep,
        depthStep,
      )}`;
    }
    return `${setGap(depth + depthStep)}  ${key}: ${value}`;
  });

  return ['{', result.join('\n'), `${setGap(depth + depthStep / 2)}}`].join(
    '\n',
  );
};

const formatValueToString = (prefix, key, value, depth, depthStep) => {
  if (typeof value === 'object' && !getActionType(value) && value !== null) {
    return `${setGap(depth)}${prefix} ${key}: ${formatObjectToString(
      value,
      depth,
      depthStep,
    )}`;
  }
  return `${setGap(depth)}${prefix} ${key}: ${value}`;
};

const formatDataStylish = (data) => {
  const depthStep = 1;

  const iter = (tree, depth) => tree.map((item) => {
    const { key } = item;

    switch (getActionType(item)) {
      case 'added':
        return formatValueToString('+', key, item.value, depth, depthStep);
      case 'removed':
        return formatValueToString('-', key, item.value, depth, depthStep);
      case 'updated':
        return `${formatValueToString(
          '-',
          key,
          item.updatedValue,
          depth,
          depthStep,
        )}\n${formatValueToString(
          '+',
          key,
          item.value,
          depth,
          depthStep,
        )}`;
      case 'nested':
        return formatValueToString(
          ' ',
          key,
          [
            '{',
            iter(item.children, depth + depthStep).join('\n'),
            `${setGap(depth + depthStep / 2)}}`,
          ].join('\n'),
          depth,
          depthStep,
        );
      default:
        return formatValueToString(' ', key, item.value, depth, depthStep);
    }
  });

  const result = ['{', iter(data, depthStep).join('\n'), '}'];

  return result.join('\n');
};

export default formatDataStylish;
