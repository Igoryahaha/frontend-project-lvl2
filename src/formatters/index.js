import formatDataStylish from './stylish.js';
import formatDataPlain from './plain.js';

const getFormattedData = (data, format) => {
  switch (format) {
    case 'plain':
      return formatDataPlain(data);
    case 'json':
      return JSON.stringify(data);
    case 'stylish':
      return formatDataStylish(data);
    default:
      throw new Error('Unknown format');
  }
};

export default getFormattedData;
