import get from 'lodash-es/get';

export default ({ iframe, location }) => {
  const iframePath = get(iframe, 'contentWindow.location.pathname', '');
  const updatedPath = `/${iframePath.replace(/^\/_|[/]$/g, '')}`;

  return location.pathname === updatedPath ? null : updatedPath;
};
