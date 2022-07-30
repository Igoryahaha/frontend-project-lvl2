import path from 'path';
import { getActionType } from '../buildDiff.js';

const formatValue = (item) => {
  if (item === null) {
    return item;
  }
  switch (typeof item) {
    case 'string':
      return `'${item}'`;
    case 'object':
      return '[complex value]';
    default:
      return item;
  }
};

const formatDataPlain = (data) => {
  const iter = (node, ancestry) => node.flatMap((item) => {
    const { key } = item;

    const newAncestry = path.join(ancestry, `${key}`).split('/').join('.');
    switch (getActionType(item)) {
      case 'added':
        return `Property '${newAncestry}' was added with value: ${formatValue(item.value)}`;
      case 'removed':
        return `Property '${newAncestry}' was removed`;
      case 'updated':
        return `Property '${newAncestry}' was updated. From ${formatValue(item.updatedValue)} to ${formatValue(item.value)}`;
      case 'nested':
        return iter(item.children, newAncestry);
      default:
        return '';
    }
  });
  const result = iter(data, '');
  return result.filter((item) => item !== '').join('\n');
};

export default formatDataPlain;
