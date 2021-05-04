import { FILTER_MODE_ADVANCED, FILTER_MODE_BASIC } from '../constants';
import getFilterModeButtonLabel from './get-filter-mode-button-label';

describe('getFilterModeButtonLabel', () => {
  describe('when called with "filterMode" = FILTER_MODE_ADVANCED', () => {
    const filterMode = FILTER_MODE_ADVANCED;
    it('should return FILTER_MODE_BASIC.', () => {
      const output = getFilterModeButtonLabel(filterMode);
      expect(output).toEqual(FILTER_MODE_BASIC);
    });
  });

  describe('when called with "filterMode" = FILTER_MODE_BASIC', () => {
    const filterMode = FILTER_MODE_BASIC;
    it('should return FILTER_MODE_ADVANCED.', () => {
      const output = getFilterModeButtonLabel(filterMode);
      expect(output).toEqual(FILTER_MODE_ADVANCED);
    });
  });

  describe('when called with "filterMode" = undefined', () => {
    const filterMode = undefined;
    it('should return FILTER_MODE_ADVANCED.', () => {
      const output = getFilterModeButtonLabel(filterMode);
      expect(output).toEqual(FILTER_MODE_ADVANCED);
    });
  });
});
