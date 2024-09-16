import parseErrorMessageForQueryTypes from '../parse-error-message-for-query-types';

const MOCK_ERROR_MESSAGE =
  'java.lang.IllegalArgumentException: Unknown query type: __query_types, knownTypes=[query1, query2]';

describe(parseErrorMessageForQueryTypes.name, () => {
  it('should parse query types from error message', () => {
    expect(parseErrorMessageForQueryTypes(MOCK_ERROR_MESSAGE)).toEqual([
      'query1',
      'query2',
    ]);
  });

  it('should return an empty array if the error does not have known types', () => {
    expect(
      parseErrorMessageForQueryTypes(
        'java.lang.IllegalArgumentException: Something else went wrong'
      )
    ).toEqual([]);
  });
});
