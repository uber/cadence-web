import moment from 'moment';
import {
  getMaxStartDate,
  getRange,
  getRangeDisplayText,
  getShortcuts,
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
    describe('When dateRange = "".', () => {
      it('should return [].', () => {
        const dateRange = '';
        const output = getRange(dateRange);
        expect(output).toEqual([]);
      });
    });

    describe('When dateRange = { startTime: March 9th 2020, endTime: March 10th 2020 }.', () => {
      const dateRange = {
        startTime: moment(new Date(2020, 2, 9)),
        endTime: moment(new Date(2020, 2, 10)),
      };

      it('should return range[0] = March 9th 2020.', () => {
        const output = getRange(dateRange);
        expect(output[0].toISOString()).toEqual('2020-03-09T07:00:00.000Z');
      });

      it('should return range[1] = March 10th 2020.', () => {
        const output = getRange(dateRange);
        expect(output[1].toISOString()).toEqual('2020-03-10T07:00:00.000Z');
      });
    });

    describe('When moment is set to March 10th 2020', () => {
      beforeEach(() => {
        jest.spyOn(Date, 'now').mockImplementation(() => new Date(2020, 2, 10).getTime());
      });

      describe('and dateRange = "last-1-second".', () => {
        const dateRange = 'last-1-second';

        it('should return range[0] = "2020-03-10T06:59:59.000Z".', () => {
          const output = getRange(dateRange);
          expect(output[0].toISOString()).toEqual('2020-03-10T06:59:59.000Z');
        });

        it('should return range[1] = "2020-03-10T07:00:00.999Z".', () => {
          const output = getRange(dateRange);
          expect(output[1].toISOString()).toEqual('2020-03-10T07:00:00.999Z');
        });
      });

      describe('and dateRange = "last-60-seconds".', () => {
        const dateRange = 'last-60-seconds';

        it('should return range[0] = "2020-03-10T06:59:00.000Z".', () => {
          const output = getRange(dateRange);
          expect(output[0].toISOString()).toEqual('2020-03-10T06:59:00.000Z');
        });

        it('should return range[1] = "2020-03-10T07:00:00.999Z".', () => {
          const output = getRange(dateRange);
          expect(output[1].toISOString()).toEqual('2020-03-10T07:00:00.999Z');
        });
      });

      describe('and dateRange = "last-1-minute".', () => {
        const dateRange = 'last-1-minute';

        it('should return range[0] = "2020-03-10T06:59:00.000Z".', () => {
          const output = getRange(dateRange);
          expect(output[0].toISOString()).toEqual('2020-03-10T06:59:00.000Z');
        });

        it('should return range[1] = "2020-03-10T07:00:59.999Z".', () => {
          const output = getRange(dateRange);
          expect(output[1].toISOString()).toEqual('2020-03-10T07:00:59.999Z');
        });
      });

      describe('and dateRange = "last-10-minutes".', () => {
        const dateRange = 'last-10-minutes';

        it('should return range[0] = "2020-03-10T06:50:00.000Z".', () => {
          const output = getRange(dateRange);
          expect(output[0].toISOString()).toEqual('2020-03-10T06:50:00.000Z');
        });

        it('should return range[1] = "2020-03-10T07:00:59.999Z".', () => {
          const output = getRange(dateRange);
          expect(output[1].toISOString()).toEqual('2020-03-10T07:00:59.999Z');
        });
      });

      describe('and dateRange = "last-1-hour".', () => {
        const dateRange = 'last-1-hour';

        it('should return range[0] = "2020-03-10T06:00:00.000Z".', () => {
          const output = getRange(dateRange);
          expect(output[0].toISOString()).toEqual('2020-03-10T06:00:00.000Z');
        });

        it('should return range[1] = "2020-03-10T07:59:59.999Z".', () => {
          const output = getRange(dateRange);
          expect(output[1].toISOString()).toEqual('2020-03-10T07:59:59.999Z');
        });
      });

      describe('and dateRange = "last-3-hours".', () => {
        const dateRange = 'last-3-hours';

        it('should return range[0] = "2020-03-10T04:00:00.000Z".', () => {
          const output = getRange(dateRange);
          expect(output[0].toISOString()).toEqual('2020-03-10T04:00:00.000Z');
        });

        it('should return range[1] = "2020-03-10T07:59:59.999Z".', () => {
          const output = getRange(dateRange);
          expect(output[1].toISOString()).toEqual('2020-03-10T07:59:59.999Z');
        });
      });

      describe('and dateRange = "last-1-day".', () => {
        const dateRange = 'last-1-day';

        it('should return range[0] = "2020-03-09T07:00:00.000Z".', () => {
          const output = getRange(dateRange);
          expect(output[0].toISOString()).toEqual('2020-03-09T07:00:00.000Z');
        });

        it('should return range[1] = "2020-03-11T06:59:59.999Z".', () => {
          const output = getRange(dateRange);
          expect(output[1].toISOString()).toEqual('2020-03-11T06:59:59.999Z');
        });
      });

      describe('and dateRange = "last-3-days".', () => {
        const dateRange = 'last-3-days';

        it('should return range[0] = "2020-03-07T08:00:00.000Z".', () => {
          const output = getRange(dateRange);
          expect(output[0].toISOString()).toEqual('2020-03-07T08:00:00.000Z');
        });

        it('should return range[1] = "2020-03-11T06:59:59.999Z".', () => {
          const output = getRange(dateRange);
          expect(output[1].toISOString()).toEqual('2020-03-11T06:59:59.999Z');
        });
      });

      describe('and dateRange = "last-1-month".', () => {
        const dateRange = 'last-1-month';

        it('should return range[0] = "2020-02-01T08:00:00.000Z".', () => {
          const output = getRange(dateRange);
          expect(output[0].toISOString()).toEqual('2020-02-01T08:00:00.000Z');
        });

        it('should return range[1] = "2020-04-01T06:59:59.999Z".', () => {
          const output = getRange(dateRange);
          expect(output[1].toISOString()).toEqual('2020-04-01T06:59:59.999Z');
        });
      });

      describe('and dateRange = "last-3-months".', () => {
        const dateRange = 'last-3-months';

        it('should return range[0] = "2019-12-01T08:00:00.000Z".', () => {
          const output = getRange(dateRange);
          expect(output[0].toISOString()).toEqual('2019-12-01T08:00:00.000Z');
        });

        it('should return range[1] = "2020-04-01T06:59:59.999Z".', () => {
          const output = getRange(dateRange);
          expect(output[1].toISOString()).toEqual('2020-04-01T06:59:59.999Z');
        });
      });
    });
  });

  describe('getRangeDisplayText', () => {
    describe('When dateRange = ""', () => {
      it('should return "".', () => {
        const dateRange = '';
        const output = getRangeDisplayText(dateRange);
        expect(output).toEqual('');
      });
    });

    describe('When dateRange = { startTime: March 9th 2020, endTime: March 10th 2020 }.', () => {
      it('should return "03/09/2020 00:00:00 - 03/10/2020 00:00:00".', () => {
        const dateRange = {
          startTime: moment(new Date(2020, 2, 9)),
          endTime: moment(new Date(2020, 2, 10)),
        };
        const output = getRangeDisplayText(dateRange);
        expect(output).toEqual('03/09/2020 00:00:00 - 03/10/2020 00:00:00');
      });
    });

    describe('When dateRange = "last-1-second"', () => {
      it('should return "Last 1 second".', () => {
        const dateRange = 'last-1-second';
        const output = getRangeDisplayText(dateRange);
        expect(output).toEqual('Last 1 second');
      });
    });

    describe('When dateRange = "last-10-seconds"', () => {
      it('should return "Last 10 seconds".', () => {
        const dateRange = 'last-10-seconds';
        const output = getRangeDisplayText(dateRange);
        expect(output).toEqual('Last 10 seconds');
      });
    });

    describe('When dateRange = "last-1-minute"', () => {
      it('should return "Last 1 minute".', () => {
        const dateRange = 'last-1-minute';
        const output = getRangeDisplayText(dateRange);
        expect(output).toEqual('Last 1 minute');
      });
    });

    describe('When dateRange = "last-10-minutes"', () => {
      it('should return "Last 10 minutes".', () => {
        const dateRange = 'last-10-minutes';
        const output = getRangeDisplayText(dateRange);
        expect(output).toEqual('Last 10 minutes');
      });
    });

    describe('When dateRange = "last-1-hour"', () => {
      it('should return "Last 1 hour".', () => {
        const dateRange = 'last-1-hour';
        const output = getRangeDisplayText(dateRange);
        expect(output).toEqual('Last 1 hour');
      });
    });

    describe('When dateRange = "last-3-hours"', () => {
      it('should return "Last 3 hours".', () => {
        const dateRange = 'last-3-hours';
        const output = getRangeDisplayText(dateRange);
        expect(output).toEqual('Last 3 hours');
      });
    });

    describe('When dateRange = "last-1-day"', () => {
      it('should return "Last 1 day".', () => {
        const dateRange = 'last-1-day';
        const output = getRangeDisplayText(dateRange);
        expect(output).toEqual('Last 1 day');
      });
    });

    describe('When dateRange = "last-3-days"', () => {
      it('should return "Last 3 days".', () => {
        const dateRange = 'last-3-days';
        const output = getRangeDisplayText(dateRange);
        expect(output).toEqual('Last 3 days');
      });
    });
  });

  describe('getShortcuts', () => {
    describe('When maxDays = 1', () => {
      const maxDays = 1;

      describe('and onClick function is called', () => {
        it('should try to call the passed in onClickHandler.', () => {
          const onClickHandler = jest.fn();
          const output = getShortcuts(maxDays, onClickHandler);
          output[0].onClick();
          expect(onClickHandler).toHaveBeenCalled();
        });
      });

      it('should return 7 shortcuts.', () => {
        const output = getShortcuts(maxDays);
        expect(output.length).toEqual(7);
      });

      it('should not contain "Last 24 hours".', () => {
        const output = getShortcuts(maxDays);
        const last24HourOption = output.find((option) => option.text === 'Last 24 hours');
        expect(last24HourOption).toEqual(undefined);
      });

      it('should return the last option as "Last 1 day".', () => {
        const output = getShortcuts(maxDays);
        const lastOption = output[output.length - 1];
        expect(lastOption.text).toEqual('Last 1 day');
      });
    });

    describe('When maxDays = 3', () => {
      const maxDays = 3;

      it('should return 8 shortcuts.', () => {
        const output = getShortcuts(maxDays);
        expect(output.length).toEqual(8);
      });

      it('should return the last option as "Last 3 days".', () => {
        const output = getShortcuts(maxDays);
        const lastOption = output[output.length - 1];
        expect(lastOption.text).toEqual('Last 3 days');
      });
    });

    describe('When maxDays = 7', () => {
      const maxDays = 7;

      it('should return 9 shortcuts.', () => {
        const output = getShortcuts(maxDays);
        expect(output.length).toEqual(9);
      });

      it('should return the last option as "Last 7 days".', () => {
        const output = getShortcuts(maxDays);
        const lastOption = output[output.length - 1];
        expect(lastOption.text).toEqual('Last 7 days');
      });
    });

    describe('When maxDays = 30', () => {
      const maxDays = 30;

      it('should return 10 shortcuts.', () => {
        const output = getShortcuts(maxDays);
        expect(output.length).toEqual(10);
      });

      it('should return the last option as "Last 30 days".', () => {
        const output = getShortcuts(maxDays);
        const lastOption = output[output.length - 1];
        expect(lastOption.text).toEqual('Last 30 days');
      });
    });

    describe('When maxDays = 90', () => {
      const maxDays = 90;

      it('should return 11 shortcuts.', () => {
        const output = getShortcuts(maxDays);
        expect(output.length).toEqual(11);
      });

      it('should return the last option as "Last 3 months".', () => {
        const output = getShortcuts(maxDays);
        const lastOption = output[output.length - 1];
        expect(lastOption.text).toEqual('Last 3 months');
      });
    });
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
