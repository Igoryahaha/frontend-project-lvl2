import path from 'path';
import { getActionType } from '../buildDiff.js';

const resolveItemType = (item) => {
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
    const { key, value } = item;

    const newAncestry = path.join(ancestry, `${key}`).split('/').join('.');
    switch (getActionType(item)) {
      case 'added':
        return `Property '${newAncestry}' was added with value: ${resolveItemType(value)}`;
      case 'removed':
        return `Property '${newAncestry}' was removed`;
      case 'updated':
        return `Property '${newAncestry}' was updated. From ${resolveItemType(item.updatedValue)} to ${resolveItemType(value)}`;
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
