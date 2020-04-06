export default ({ statusList, statusValue }) => {
  if (statusValue === undefined) {
    return statusList[0];
  }

  const parsedStatusValue = String(statusValue);

  return statusList.find(({ value }) => value === parsedStatusValue);
};
