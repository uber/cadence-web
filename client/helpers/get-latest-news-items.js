import get from 'lodash-es/get';

export default (response, newsLastUpdated) => {
  const newsItems = get(response, 'items', []);
  return !newsLastUpdated ?
    newsItems :
    newsItems.filter(({ date_modified }) => date_modified > newsLastUpdated);
};
