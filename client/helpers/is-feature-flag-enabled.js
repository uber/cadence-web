import featureFlags from '../feature-flags.json';

export const isFlagEnabled = ({ flagHash = {}, name = '' }) =>
  flagHash[name] || false;

export const mapFlagsToHash = (flagArray = []) => {
  return flagArray.reduce((accumulator, { key = '', value = false }) => {
    accumulator[key] = value;

    return accumulator;
  }, {});
};

const featureFlagHash = mapFlagsToHash(featureFlags);
const isFeatureFlagEnabled = (name) => isFlagEnabled({ flagHash: featureFlagHash, name });

export default isFeatureFlagEnabled;
