export default ({ statusList, statusValue }) => {
  return statusValue === undefined
    ? statusList[0]
    : statusList.find(({ value }) => value === statusValue);
};
