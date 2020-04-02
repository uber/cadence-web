export default ({ statusList, statusValue }) => {
  return !statusValue
    ? statusList[0]
    : statusList.find(({ value }) => value === statusValue);
};
