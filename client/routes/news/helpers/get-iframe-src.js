export default ({ article, date, month, origin, year }) =>
  [`${origin}/_news`, year, month, date, article]
    .filter(segment => !!segment)
    .join('/');
