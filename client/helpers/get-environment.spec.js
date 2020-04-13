import getEnvironment from './get-environment';

describe('getEnvironment', () => {
  const LOCALHOST_DOMAIN = 'http://localhost:8088';
  const LOCALHOST_OPTION = {
    label: 'Localhost',
    value: LOCALHOST_DOMAIN,
  };

  const UNKNOWN_DOMAIN = 'http://unknown.domain.com';
  const UNKNOWN_OPTION = {
    label: 'Unknown',
    value: UNKNOWN_DOMAIN,
  };

  const ENVIRONMENT_LIST = [LOCALHOST_OPTION];

  it('should return UNKNOWN_OPTION when origin = UNKNOWN_DOMAIN and is not part of environmentList.', () => {
    const output = getEnvironment({
      environmentList: ENVIRONMENT_LIST,
      origin: UNKNOWN_DOMAIN,
    });

    expect(output).toEqual(UNKNOWN_OPTION);
  });

  it('should return LOCALHOST_OPTION when origin = LOCALHOST_DOMAIN and environmentList = [LOCALHOST_OPTION].', () => {
    const output = getEnvironment({
      environmentList: ENVIRONMENT_LIST,
      origin: LOCALHOST_DOMAIN,
    });

    expect(output).toEqual(LOCALHOST_OPTION);
  });
});
