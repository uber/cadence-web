import { getTimePanelLabel } from './helpers';

describe('DateRangePicker helpers', () => {
  describe('getMaxStartDate', () => {
    describe('When moment is set to March 10th 2020', () => {


      describe('and maxDays = 1', () => {
        it('should return date March 9th 2020.', () => {
          // TODO
        });
      });

      describe('and maxDays = 3', () => {
        it('should return date March 7th 2020.', () => {
          // TODO
        });
      });

      describe('and maxDays = 30', () => {
        it('should return date Feburary 10th 2020.', () => {
          // TODO
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
    // TODO
  });
});
