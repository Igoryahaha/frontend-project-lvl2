import formatDataStylish from './stylish.js';
import formatDataPlain from './plain.js';

const getFormattedData = (data, format) => {
  switch (format) {
    case 'plain':
      return formatDataPlain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      return formatDataStylish(data);
  }
};

export default getFormattedData;
