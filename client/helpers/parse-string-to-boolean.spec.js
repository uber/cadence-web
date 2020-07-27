import parseStringToBoolean from './parse-string-to-boolean';

describe('parseStringToBoolean', () => {
  it('should return true when passed value = "true".', () => {
    const output = parseStringToBoolean('true');
    expect(output).toEqual(true);
  });

  it('should return false when passed value = "false".', () => {
    const output = parseStringToBoolean('false');
    expect(output).toEqual(false);
  });

  it('should return false when nothing is passed.', () => {
    const output = parseStringToBoolean();
    expect(output).toEqual(false);
  });

  it('should return true when passed value = null and defaultValue = true.', () => {
    const output = parseStringToBoolean(null, true);
    expect(output).toEqual(true);
  });
});
