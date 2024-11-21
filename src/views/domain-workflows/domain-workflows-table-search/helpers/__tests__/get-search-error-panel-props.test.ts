import { RequestError } from '@/utils/request/request-error';

import getSearchErrorPanelProps from '../get-search-error-panel-props';

describe(getSearchErrorPanelProps.name, () => {
  it('returns default error panel props for regular error', () => {
    expect(
      getSearchErrorPanelProps({
        error: new RequestError('Test error', 500),
        areSearchParamsAbsent: false,
      })
    ).toEqual({
      message: 'Failed to fetch workflows',
      actions: [{ kind: 'retry', label: 'Retry' }],
    });
  });

  it('returns "not found" error panel props when search params are absent', () => {
    expect(
      getSearchErrorPanelProps({
        error: null,
        areSearchParamsAbsent: true,
      })
    ).toEqual({
      message: 'No workflows found for this domain',
      omitLogging: true,
      actions: [
        {
          kind: 'link-external',
          label: 'Get started on workflows',
          link: 'https://cadenceworkflow.io/docs/concepts/workflows',
        },
      ],
    });
  });

  it('returns undefined in all other cases', () => {
    expect(
      getSearchErrorPanelProps({
        error: null,
        areSearchParamsAbsent: false,
      })
    ).toBeUndefined();
  });
});
