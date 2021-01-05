import getEscapedCharacterString from './get-escaped-character-string';

describe('getEscapedCharacterString', () => {
  it('should escape one hash and convert to %23.', () => {
    const input = '#';
    const output = getEscapedCharacterString(input);

    expect(output).toEqual('%23');
  });

  it('should escape one forward slash and convert to %2F.', () => {
    const input = '/';
    const output = getEscapedCharacterString(input);

    expect(output).toEqual('%2F');
  });

  it('should escape one hash and one forward slash and convert to %23%2F', () => {
    const input = '#/';
    const output = getEscapedCharacterString(input);

    expect(output).toEqual('%23%2F');
  });
});
