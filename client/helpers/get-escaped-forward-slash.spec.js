import getEscapedForwardSlash from './get-escaped-forward-slash';

describe('getEscapedForwardSlash', () => {
  it('should escape one forward slash and convert to %2F.', () => {
    const input = '/';
    const output = getEscapedForwardSlash(input);

    expect(output).toEqual('%2F');
  });

  it('should escape many forward slashes and convert each to %2F.', () => {
    const input = '///';
    const output = getEscapedForwardSlash(input);

    expect(output).toEqual('%2F%2F%2F');
  });

  it('should convert forward slashes in a string containing other characters with forward slashes.', () => {
    const input = 'hello/world';
    const output = getEscapedForwardSlash(input);

    expect(output).toEqual('hello%2Fworld');
  });

  it('should not do anything if string does not contain forward slash.', () => {
    const input = 'helloworld';
    const output = getEscapedForwardSlash(input);

    expect(output).toEqual('helloworld');
  });
});
