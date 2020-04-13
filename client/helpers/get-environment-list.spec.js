import getEnvironmentList from './get-environment-list';

describe('getEnvironmentList', () => {
  it('should exclude the current environment from the list.', () => {
    const environmentList = [
      {
        value: 'https://production-environment.com',
      },
      {
        value: 'https://staging-environment.com',
      },
      {
        value: 'https://development-environment.com',
      },
    ];
    const origin = 'https://production-environment.com';
    const output = getEnvironmentList({ environmentList, origin });

    expect(output.length).toEqual(2);
    expect(output[0]).toEqual({
      value: 'https://staging-environment.com',
    });
    expect(output[1]).toEqual({
      value: 'https://development-environment.com',
    });
  });
});
