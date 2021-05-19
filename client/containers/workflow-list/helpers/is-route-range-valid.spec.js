import moment from 'moment';
import isRouteRangeValid from './is-route-range-valid';

describe('isRouteRangeValid', () => {
  describe('minStartDate = 5 days before now', () => {
    const now = '2021-05-06';
    const minStartDate = moment(now).subtract(5, 'days');

    describe('range = "last-3-days"', () => {
      const range = 'last-3-days';

      it('should return true', () => {
        const output = isRouteRangeValid({ minStartDate, now, range });
        expect(output).toEqual(true);
      });
    });

    describe('startTime = "2021-05-01", endTime = "2021-05-06"', () => {
      const startTime = '2021-05-01';
      const endTime = '2021-05-06';

      it('should return true', () => {
        const output = isRouteRangeValid({ endTime, minStartDate, now, startTime });
        expect(output).toEqual(true);
      });
    });
  });
});
