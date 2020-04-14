export default ({ environment: { value }, pathname = '', search = '' }) =>
  `${value}${pathname}${search}`;
