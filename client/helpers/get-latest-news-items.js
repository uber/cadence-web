import get from 'lodash-es/get';

export default (response, newsLastUpdated) => {
  const newsLastUpdatedTime = new Date(newsLastUpdated).getTime();
  const newsItems = get(response, 'items', [])
    .map(({ url, ...newsItem }) => ({
      ...newsItem,
      url: `/${url.replace(/^\/_|[\/]$/g, '')}`,
    }));

  return !newsLastUpdated ?
    newsItems :
    newsItems
      .filter(({ date_modified }) => new Date(date_modified).getTime() > newsLastUpdatedTime);
};
