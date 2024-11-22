import { RequestError } from '@/utils/request/request-error';

import getQueryErrorPanelProps from '../get-query-error-panel-props';

describe(getQueryErrorPanelProps.name, () => {
  it('returns default error panel props for regular error', () => {
    expect(
      getQueryErrorPanelProps({
        error: new RequestError('Test error', 500),
      })
    ).toEqual({
      message: 'Failed to fetch workflows',
      actions: [{ kind: 'retry', label: 'Retry' }],
    });
  });

  it('returns query error message directly for bad request error', () => {
    expect(
      getQueryErrorPanelProps({
        error: new RequestError('Test error', 400),
      })
    ).toEqual({
      message: 'Error in query: Test error',
    });
  });
});
