import _ from 'lodash';

const getDiff = (data1, data2) => {
  const sortedKeys = _.sortBy(_.uniq(Object.keys({ ...data1, ...data2 })));

  return sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { actionType: 'added', key, value: value2 };
    }
    if (!_.has(data2, key)) {
      return { actionType: 'removed', key, value: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        actionType: 'nested',
        key,
        children: getDiff(value1, value2),
      };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        actionType: 'updated',
        key,
        updatedValue: value1,
        value: value2,
      };
    }
    return { actionType: 'unchanged', key, value: value1 };
  });
};

export const getActionType = (data) => data.actionType;

export default getDiff;
