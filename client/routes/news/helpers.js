import get from 'lodash-es/get';

export const getIFrameSrc = ({
  article,
  date,
  month,
  origin,
  year,
}) => [`${origin}/_news`, year, month, date, article]
    .filter((segment) => !!segment)
    .join('/');

export const getUpdatedIFrameLocation = ({ iframe, location }) => {
  const iframePath = get(iframe, 'contentWindow.location.pathname', '');
  const updatedPath = `/${iframePath.replace(/^\/_|[\/]$/g, '')}`;
  return !updatedPath || location.pathname === updatedPath ?
    null :
    updatedPath;
};
