const featureFlags = require('./feature-flags.json');

const featureFlagHandler = (ctx, next) => {
  const {
    params: { key },
  } = ctx;
  const featureFlag = featureFlags.find(featureFlag => featureFlag.key === key);
  const value = (featureFlag && featureFlag.value) || false;

  ctx.body = {
    key,
    value,
  };

  next();
};

module.exports = featureFlagHandler;
