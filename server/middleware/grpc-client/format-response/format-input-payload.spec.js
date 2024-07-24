import formatInputPayload from './format-input-payload';

describe('formatInputPayload', () => {
  // empty data checks
  it('should return null if payload is null', () => {
    const input = null;
    const expected = null;
    expect(formatInputPayload(input)).toEqual(expected);
  });

  it('should return null if payload is undefined', () => {
    const input = undefined;
    const expected = null;
    expect(formatInputPayload(input)).toEqual(expected);
  });

  it('should return null if data is missing', () => {
    const input = {};
    const expected = null;
    expect(formatInputPayload(input)).toEqual(expected);
  });

  it('should return null if data is null', () => {
    const input = { data: null };
    const expected = null;
    expect(formatInputPayload(input)).toEqual(expected);
  });

  it('should return null if data is an empty string', () => {
    const input = { data: '' };
    const expected = null;
    expect(formatInputPayload(input)).toEqual(expected);
  });
  // end of empty data checks

  it('should parse base64 encoded JSON lines correctly', () => {
    const input = {
      data: btoa(`{"name": "John", "age": 30}\n{"name": "Jane", "age": 25}`),
    };
    const expected = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ];
    expect(formatInputPayload(input)).toEqual(expected);
  });
});
