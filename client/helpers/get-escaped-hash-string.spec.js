import getEscapedHashString from './get-escaped-hash-string';

describe('getEscapedHashString', () => {
  it('should escape one hash and convert to %23.', () => {
    const input = '#';
    const output = getEscapedHashString(input);

    expect(output).toEqual('%23');
  });

  it('should escape many hashes and convert each to %23.', () => {
    const input = '###';
    const output = getEscapedHashString(input);

    expect(output).toEqual('%23%23%23');
  });

  it('should convert hashes in a string containing other characters with hash.', () => {
    const input = 'hello#world';
    const output = getEscapedHashString(input);

    expect(output).toEqual('hello%23world');
  });

  it('should not do anything if string does not contain hash.', () => {
    const input = 'helloworld';
    const output = getEscapedHashString(input);

    expect(output).toEqual('helloworld');
  });
});
