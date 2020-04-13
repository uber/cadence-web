import getEnvironmentLocation from './get-environment-location';

describe('getEnvironmentLocation', () => {
  it(`should return "https://production-environment.com/path/to/page?query=hello" when passed
      environment = { value: "https://production-environment.com" }
      pathname = "/path/to/page"
      search = "?query=hello"`, () => {
    const environment = { value: 'https://production-environment.com' };
    const pathname = '/path/to/page';
    const search = '?query=hello';
    const output = getEnvironmentLocation({ environment, pathname, search });

    expect(output).toEqual(
      'https://production-environment.com/path/to/page?query=hello'
    );
  });
});
