import getDefaultState from './get-default-state';

describe('workflow getDefaultState', () => {
  describe('when state is not passed', () => {
    it('should return execution = null.', () => {
      const output = getDefaultState();
      expect(output.execution).toEqual(null);
    });

    it('should return isLoading = true.', () => {
      const output = getDefaultState();
      expect(output.isLoading).toEqual(true);
    });
  });

  describe('when state is passed with execution defined', () => {
    const state = { execution: {} };

    it('should return execution.', () => {
      const output = getDefaultState(state);
      expect(output.execution).toEqual({});
    });
  });

  describe('when state is passed with isLoading = false', () => {
    const state = { isLoading: false };

    it('should return isLoading = false.', () => {
      const output = getDefaultState(state);
      expect(output.isLoading).toEqual(false);
    });
  });
});
