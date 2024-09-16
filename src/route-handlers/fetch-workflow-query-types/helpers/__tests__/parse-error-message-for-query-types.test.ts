import parseErrorMessageForQueryTypes from '../parse-error-message-for-query-types';

<<<<<<< HEAD
describe(parseErrorMessageForQueryTypes.name, () => {
  it('should parse query types from error message', () => {
    expect(
      parseErrorMessageForQueryTypes(
        'java.lang.IllegalArgumentException: Unknown query type: __query_types, knownTypes=[query1, query2]'
      )
    ).toEqual(['query1', 'query2']);
  });

  it('should return an empty array from an error message with no query types', () => {
    expect(
      parseErrorMessageForQueryTypes(
        'java.lang.IllegalArgumentException: Unknown query type: __query_types, knownTypes=[]'
      )
    ).toEqual([]);
  });

  it('should return undefined if the error does not have knownTypes', () => {
=======
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
>>>>>>> a3f8a50 (Add tests)
    expect(
      parseErrorMessageForQueryTypes(
        'java.lang.IllegalArgumentException: Something else went wrong'
      )
<<<<<<< HEAD
    ).toEqual(undefined);
=======
    ).toEqual([]);
>>>>>>> a3f8a50 (Add tests)
  });
});
