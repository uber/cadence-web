import get from 'lodash-es/get';

export default (response, newsLastUpdated) => {
  const newsItems = get(response, 'items', [])
    .map(({ url, ...newsItem }) => ({
      ...newsItem,
      url: `/${url.replace(/^\/_|[\/]$/g, '')}`,
    }));

  return !newsLastUpdated ?
    newsItems :
    newsItems
      .filter(({ date_modified }) => date_modified > newsLastUpdated);
};
