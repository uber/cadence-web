import getDefaultState from './get-default-state';

describe('workflow history getDefaultState', () => {
  describe('when state is not passed', () => {
    it('should return graphEnabled = true', () => {
      const output = getDefaultState();
      expect(output.graphEnabled).toEqual(true);
    })
  });

  describe('when state is passed and has graphEnabled = false', () => {
    const state = {
      graphEnabled: false,
    };

    it('should return graphEnabled = false', () => {
      const output = getDefaultState(state);
      expect(output.graphEnabled).toEqual(false);
    })
  });
});
