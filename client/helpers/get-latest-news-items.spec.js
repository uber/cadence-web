import getLatestNewsItems from './get-latest-news-items';

describe('getLatestNewsItems', () => {
  const response = {
    items: [
      {
        url: '/_news/news-item-1',
        date_modified: '2020-04-29T00:00:00.000Z',
      },
      {
        url: '/_news/news-item-2',
        date_modified: '2020-04-28T00:00:00.000Z',
      },
      {
        url: '/_news/news-item-3',
        date_modified: '2020-04-27T00:00:00.000Z',
      },
    ],
  };

  it('should return all newsItems from response when newsLastUpdated is undefined.', () => {
    const newsLastUpdated = undefined;
    const output = getLatestNewsItems({ newsLastUpdated, response });

    expect(output).toEqual([
      {
        url: '/news/news-item-1',
        date_modified: '2020-04-29T00:00:00.000Z',
      },
      {
        url: '/news/news-item-2',
        date_modified: '2020-04-28T00:00:00.000Z',
      },
      {
        url: '/news/news-item-3',
        date_modified: '2020-04-27T00:00:00.000Z',
      },
    ]);
  });

  it('should return a subset of newsItems from response when newsLastUpdated is a date before the latest item in the newsItems list.', () => {
    const newsLastUpdated = '2020-04-27T00:00:00.000Z';
    const output = getLatestNewsItems({ newsLastUpdated, response });

    expect(output).toEqual([
      {
        url: '/news/news-item-1',
        date_modified: '2020-04-29T00:00:00.000Z',
      },
      {
        url: '/news/news-item-2',
        date_modified: '2020-04-28T00:00:00.000Z',
      },
    ]);
  });

  it('should return an empty newsItems from response when newsLastUpdated matches the date of the latest item.', () => {
    const newsLastUpdated = '2020-04-29T00:00:00.000Z';
    const output = getLatestNewsItems({ newsLastUpdated, response });

    expect(output).toEqual([]);
  });
});
