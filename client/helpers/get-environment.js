export default ({ environmentList, origin }) =>
  environmentList.find(({ value }) => value === origin) || {
    label: 'Unknown',
    value: origin,
  };
