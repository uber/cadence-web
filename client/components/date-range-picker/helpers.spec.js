import { getTimePanelLabel } from './helpers';

describe('DateRangePicker helpers', () => {
  describe('getMaxStartDate', () => {
    // TODO
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
