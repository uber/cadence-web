export const getSrc = ({
  article,
  date,
  month,
  origin,
  year,
}) => [`${origin}/_news`, year, month, date, article]
    .filter((segment) => !!segment)
    .join('/');

export const getLocation = pathname => `/${pathname.replace(/^\/_|[\/]$/g, '')}`;
