import getStatusValue from './get-status-value';

describe('getStatusValue', () => {
  describe('When status = { value: 5 }', () => {
    it('should return 5.', () => {
      const status = { value: 5 };
      const output = getStatusValue({ status });

      expect(output).toEqual(5);
    });
  });

  describe('When statusList = [{ value: "CLOSED" }]', () => {
    it('should return "CLOSED".', () => {
      const statusList = [{ value: 'CLOSED' }];
      const output = getStatusValue({ statusList });

      expect(output).toEqual('CLOSED');
    });
  });
});
