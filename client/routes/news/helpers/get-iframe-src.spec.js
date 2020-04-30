import getIFrameSrc from './get-iframe-src';

describe('getIFrameSrc', () => {
  const origin = 'http://cadence.com';

  it('should return "http://cadence.com/_news" when only origin is provided.', () => {
    const output = getIFrameSrc({ origin });

    expect(output).toEqual('http://cadence.com/_news');
  });

  it('should return "http://cadence.com/_news/2020/04/30/article-1" when article, date, month, origin, year are provided.', () => {
    const article = 'article-1';
    const date = '30';
    const month = '04';
    const year = '2020';
    const output = getIFrameSrc({ article, date, month, origin, year });

    expect(output).toEqual('http://cadence.com/_news/2020/04/30/article-1');
  });

  it('should return "http://cadence.com/_news/page/2" when navigating to page 2.', () => {
    const year = 'page';
    const month = '2';
    const output = getIFrameSrc({ month, origin, year });

    expect(output).toEqual('http://cadence.com/_news/page/2');
  });
});
