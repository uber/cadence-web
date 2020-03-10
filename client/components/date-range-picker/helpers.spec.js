import moment from 'moment';
import {
  getMaxStartDate,
  getTimePanelLabel,
  isDayDisabled,
} from './helpers';

describe('DateRangePicker helpers', () => {
  describe('getMaxStartDate', () => {
    describe('When moment is set to March 10th 2020', () => {
      beforeEach(() => {
        jest.spyOn(Date, 'now').mockImplementation(() => new Date(2020, 2, 10).getTime());
      });

      describe('and maxDays = 1', () => {
        it('should return date March 9th 2020.', () => {
          const maxDays = 1;
          const output = getMaxStartDate(maxDays);
          expect(output.toISOString()).toEqual('2020-03-09T07:00:00.000Z');
        });
      });

      describe('and maxDays = 3', () => {
        it('should return date March 7th 2020.', () => {
          const maxDays = 3;
          const output = getMaxStartDate(maxDays);
          expect(output.toISOString()).toEqual('2020-03-07T08:00:00.000Z');
        });
      });

      describe('and maxDays = 30', () => {
        it('should return date Feburary 9th 2020.', () => {
          const maxDays = 30;
          const output = getMaxStartDate(maxDays);
          expect(output.toISOString()).toEqual('2020-02-09T08:00:00.000Z');
        });
      });
    });
  });

  describe('getRange', () => {
    // TODO
  });

  describe('getRangeDisplayText', () => {
    // TODO
  });

  describe('getShortcuts', () => {
    // TODO
  });

  describe('getTimePanelLabel', () => {
    describe('When showTimePanel = true', () => {
      it('should return "select date".', () => {
        const showTimePanel = true;
        const output = getTimePanelLabel(showTimePanel);
        expect(output).toEqual('select date');
      });
    });

    describe('When showTimePanel = false', () => {
      it('should return "select time".', () => {
        const showTimePanel = false;
        const output = getTimePanelLabel(showTimePanel);
        expect(output).toEqual('select time');
      });
    });
  });

  describe('isDayDisabled', () => {
    describe('When moment is set to March 10th 2020', () => {
      beforeEach(() => {
        jest.spyOn(Date, 'now').mockImplementation(() => new Date(2020, 2, 10).getTime());
      });

      describe('and maxStartDate = March 8th 2020', () => {
        let maxStartDate;

        beforeEach(() => {
          maxStartDate = moment(new Date(2020, 2, 8));
        });

        describe('and date = March 10th 2020', () => {
          it('should return false.', () => {
            const date = new Date(2020, 2, 10);
            const output = isDayDisabled(maxStartDate)(date);
            expect(output).toEqual(false);
          });
        });

        describe('and date = March 9th 2020', () => {
          it('should return false.', () => {
            const date = new Date(2020, 2, 9);
            const output = isDayDisabled(maxStartDate)(date);
            expect(output).toEqual(false);
          });
        });

        describe('and date = March 8th 2020', () => {
          it('should return false.', () => {
            const date = new Date(2020, 2, 8);
            const output = isDayDisabled(maxStartDate)(date);
            expect(output).toEqual(false);
          });
        });

        describe('and date = March 7th 2020', () => {
          it('should return true.', () => {
            const date = new Date(2020, 2, 7);
            const output = isDayDisabled(maxStartDate)(date);
            expect(output).toEqual(true);
          });
        });

        describe('and date = March 11th 2020', () => {
          it('should return true.', () => {
            const date = new Date(2020, 2, 11);
            const output = isDayDisabled(maxStartDate)(date);
            expect(output).toEqual(true);
          });
        });
      });
    });
  });
});
