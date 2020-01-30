import moment from 'moment';
import getTimeStampDisplay from './get-time-stamp-display';

describe('getTimeStampDisplay', () => {
  const DATE = '2020-01-01 00:00:00';

  describe('When passed an event with no timestamp', () => {
    it('should return "".', () => {
      const event = {};
      const output = getTimeStampDisplay(event);

      expect(output).toEqual('');
    });
  });

  describe('When passed an event with a timestamp and index = -1', () => {
    it('should return "".', () => {
      const event = {
        timestamp: moment(DATE),
      };
      const index = -1;
      const output = getTimeStampDisplay(event, index);

      expect(output).toEqual('');
    });
  });

  describe('When passed an event with a timestamp and index = 0', () => {
    it('should return the date string.', () => {
      const event = {
        timestamp: moment(DATE),
      };
      const index = 0;
      const output = getTimeStampDisplay(event, index);

      expect(output).toEqual('Jan 1st 12:00:00 am');
    });
  });
});
