import getUpdatedIFrameLocation from './get-updated-iframe-location';

describe('getUpdatedIFrameLocation', () => {
  it('should return null when the iframe pathname matches location pathname.', () => {
    const iframe = {
      contentWindow: {
        location: {
          pathname: '/_news',
        },
      },
    };
    const location = {
      pathname: '/news',
    };
    const output = getUpdatedIFrameLocation({ iframe, location });
    expect(output).toEqual(null);
  });

  it('should return the updated path when the iframe pathname does not match location pathname.', () => {
    const iframe = {
      contentWindow: {
        location: {
          pathname: '/_news/2020/04/30/article-1',
        },
      },
    };
    const location = {
      pathname: '/news',
    };
    const output = getUpdatedIFrameLocation({ iframe, location });
    expect(output).toEqual('/news/2020/04/30/article-1');
  });
});
