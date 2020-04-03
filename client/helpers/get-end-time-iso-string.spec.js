import getEndTimeIsoString from './get-end-time-iso-string';

describe('getEndTimeIsoString', () => {
  describe('When range = undefined', () => {
    it('should return endTimeString.', () => {
      const range = undefined;
      const endTimeString = '2020-03-30T00:00:00Z';
      const output = getEndTimeIsoString(range, endTimeString);

      expect(output).toEqual(endTimeString);
    });
  });

  describe('When moment is set to March 1st 2020 and range = "last-30-days"', () => {
    it('should return "2020-03-02T07:59:59.999Z".', () => {
      jest
        .spyOn(Date, 'now')
        .mockImplementation(() => new Date(2020, 2, 1).getTime());
      const range = 'last-30-days';
      const endTimeString = '';
      const output = getEndTimeIsoString(range, endTimeString);

      expect(output).toEqual('2020-03-02T07:59:59.999Z');
    });
  });
});
