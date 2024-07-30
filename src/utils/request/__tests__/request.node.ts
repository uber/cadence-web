import request from '../request';

describe('request', () => {
  afterEach(() => {
    const mockedFetch = global.fetch as jest.MockedFunction<
      typeof global.fetch
    >;
    mockedFetch.mockClear();
  });
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      } as Response)
    );
  });
  it('should call fetch with relative URL converted to absolute URL on server and no-cache option', async () => {
    const url = '/api/data';
    const options = { method: 'POST' };
    await request(url, options);
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8088' + url, {
      cache: 'no-cache',
      ...options,
    });
  });
  // TODO: @assem.hafez add test for server, currently the testing environment is browser
});
