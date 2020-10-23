import moment from 'moment';
import getRange from './get-range';

describe('getRange', () => {
  describe('When nothing is passed', () => {
    it('should return "last-24-hours".', () => {
      const output = getRange();

      expect(output).toEqual('last-24-hours');
    });
  });

  describe('When range = "last-10-days"', () => {
    it('should return "last-10-days".', () => {
      const range = 'last-10-days';
      const output = getRange({ range });

      expect(output).toEqual('last-10-days');
    });
  });

  describe('When startTime = "2020-03-01T00:00:00Z" and endTime = "2020-03-30T00:00:00Z"', () => {
    let startTime;
    let endTime;

    beforeEach(() => {
      startTime = '2020-03-01T00:00:00Z';
      endTime = '2020-03-30T00:00:00Z';
    });

    it('should return startTime = moment("2020-03-01T00:00:00Z").', () => {
      const output = getRange({ endTime, startTime });

      expect(output.startTime).toEqual(moment('2020-03-01T00:00:00Z'));
    });

    it('should return endTime = moment("2020-03-30T00:00:00Z").', () => {
      const output = getRange({ endTime, startTime });

      expect(output.endTime).toEqual(moment('2020-03-30T00:00:00Z'));
    });
  });
});
