const sortComparatorNumeric = (key, ascending) => {
  const sign = ascending ? -1 : 1;

  return (eventA, eventB) => sign * (eventB[key] - eventA[key]);
};

export default sortComparatorNumeric;
