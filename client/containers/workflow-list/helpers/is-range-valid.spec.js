import moment from 'moment';
import isRangeValid from './is-range-valid';

describe('isRangeValid', () => {
  describe('minStartDate = 5 days before now', () => {
    const now = '2021-05-06';
    const minStartDate = moment(now).subtract(5, 'days');

    describe('range = "last-3-days"', () => {
      const range = 'last-3-days';

      it('should return true', () => {
        const output = isRangeValid({ minStartDate, now, range });
        expect(output).toEqual(true);
      });
    });

    describe('range = "last-7-days"', () => {
      const range = 'last-7-days';

      it('should return false', () => {
        const output = isRangeValid({ minStartDate, now, range });
        expect(output).toEqual(false);
      });
    });

    describe('range = { startTime: "2021-05-01", endTime: "2021-05-06" }', () => {
      const range = { startTime: '2021-05-01', endTime: '2021-05-06' };

      it('should return true', () => {
        const output = isRangeValid({ minStartDate, now, range });
        expect(output).toEqual(true);
      });
    });

    describe('range = { startTime: "2021-04-28", endTime: "2021-05-06" }', () => {
      const range = { startTime: "2021-04-28", endTime: "2021-05-06" };

      it('should return false', () => {
        const output = isRangeValid({ minStartDate, now, range });
        expect(output).toEqual(false);
      });
    });

    describe('range = { startTime: "2021-05-06", endTime: "2021-05-01" }', () => {
      const range = { startTime: "2021-05-06", endTime: "2021-05-01" };

      it('should return false', () => {
        const output = isRangeValid({ minStartDate, now, range });
        expect(output).toEqual(false);
      });
    });
  });
});
