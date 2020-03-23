import moment from 'moment';
import getTimeElapsedDisplay from './get-time-elapsed-display';

describe('getTimeElapsedDisplay', () => {
  const DATE = '2020-01-01 00:00:00';
  const DATE_PLUS_ONE_HOUR = '2020-01-01 01:00:00';

  describe('When passed an event with no timestamp', () => {
    it('should return "".', () => {
      const event = {};
      const output = getTimeElapsedDisplay(event);

      expect(output).toEqual('');
    });
  });

  describe('When passed an event with a timestamp and index = -1', () => {
    it('should return "".', () => {
      const event = {
        timestamp: moment(DATE),
      };
      const index = -1;
      const output = getTimeElapsedDisplay(event, index);

      expect(output).toEqual('');
    });
  });

  describe('When passed an event with a timestamp and index = 0', () => {
    it('should return the date string.', () => {
      const event = {
        timestamp: moment(DATE),
      };
      const index = 0;
      const output = getTimeElapsedDisplay(event, index);

      expect(output).toEqual('Jan 1st 12:00:00 am');
    });
  });

  describe('When passed an event with a timestamp and index = 1 and eventList', () => {
    it('should return the elapsed time between the first event and the second.', () => {
      const eventList = [
        {
          timestamp: moment(DATE),
        },
        {
          timestamp: moment(DATE_PLUS_ONE_HOUR),
        },
      ];
      const index = 1;
      const event = eventList[index];
      const output = getTimeElapsedDisplay(event, index, eventList);

      expect(output).toEqual('1h (+1h)');
    });
  });
});
