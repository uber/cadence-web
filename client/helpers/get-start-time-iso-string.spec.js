import getStartTimeIsoString from './get-start-time-iso-string';

describe('getStartTimeIsoString', () => {
  describe('When range = undefined and startTimeString = "2020-03-30T00:00:00Z"', () => {
    it('should return "2020-03-30T00:00:00Z".', () => {
      const range = undefined;
      const startTimeString = '2020-03-30T00:00:00Z';
      const output = getStartTimeIsoString(range, startTimeString);

      expect(output).toEqual(startTimeString);
    });
  });

  describe('When moment is set to March 1st 2020 and range = "last-30-days"', () => {
    it('should return "2020-01-31T08:00:00.000Z".', () => {
      jest
        .spyOn(Date, 'now')
        .mockImplementation(() => new Date(2020, 2, 1).getTime());
      const range = 'last-30-days';
      const startTimeString = '';
      const output = getStartTimeIsoString(range, startTimeString);

      expect(output).toEqual('2020-01-31T08:00:00.000Z');
    });
  });
});
