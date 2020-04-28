import get from 'lodash-es/get';

export const getSrc = ({
  article,
  date,
  month,
  origin,
  year,
}) => [`${origin}/_news`, year, month, date, article]
    .filter((segment) => !!segment)
    .join('/');

export const getLocation = ({ iframe, location }) => {
  const childPath = get(iframe, 'contentWindow.location.pathname', '');
  const parentPath = `/${childPath.replace(/^\/_|[\/]$/g, '')}`;
  return !parentPath || location.pathname === parentPath ?
    null :
    parentPath;
};
