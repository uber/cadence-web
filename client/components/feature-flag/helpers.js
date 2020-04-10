export const isEnabled = ({ flagHash = {}, name = '' }) =>
  flagHash[name] || false;

export const mapFlagsToHash = (flagArray = []) => {
  return flagArray.reduce((accumulator, { name = '', value = false }) => {
    accumulator[name] = value;

    return accumulator;
  }, {});
};
