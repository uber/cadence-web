const parseStringToBoolean = (value, defaultValue = false) => {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  return defaultValue;
};

export default parseStringToBoolean;
