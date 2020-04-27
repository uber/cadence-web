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
  const pathname = get(iframe, 'contentWindow.location.pathname');
  return !pathname || location.pathname === pathname ?
    null :
    `/${pathname.replace(/^\/_|[\/]$/g, '')}`;
};
