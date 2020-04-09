export default ({ status, statusList }) =>
  status ? status.value : statusList[0].value;
