import getUpdatedQuery from './get-updated-query';

describe('route helpers getUpdatedQuery', () => {
  describe('when getUpdatedQuery is called with a param in payload that is an empty string', () => {
    it('should omit that entry from the returned updated query.', () => {
      const query = {
        omittedQuery: 'previous-query-value',
      };

      const payload = {
        omittedQuery: '',
      };

      const output = getUpdatedQuery({ payload, query });
      expect(output.omittedQuery).toEqual(undefined);
    });
  });
});
