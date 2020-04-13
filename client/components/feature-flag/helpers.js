export const isFlagEnabled = ({ flagHash = {}, name = '' }) =>
  flagHash[name] || false;

export const mapFlagsToHash = (flagArray = []) => {
  return flagArray.reduce((accumulator, { key = '', value = false }) => {
    accumulator[key] = value;

    return accumulator;
  }, {});
};
