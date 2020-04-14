export default ({ environmentList, origin }) =>
  environmentList.filter(({ value }) => value !== origin);
