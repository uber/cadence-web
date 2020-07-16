import getQueryStringFromObject from './get-query-string-from-object';

describe('getQueryStringFromObject', () => {
  it('should return empty string when no params are passed.', () => {
    const output = getQueryStringFromObject();
    expect(output).toEqual('');
  });

  it('should return an url encoded query param string when params are passed.', () => {
    const output = getQueryStringFromObject({
      stringParam: 'string',
      booleanParam: true,
      numberParam: 20,
    });
    expect(output).toEqual('?stringParam=string&booleanParam=true&numberParam=20');
  });
});
