import React from 'react';

import { render, screen } from '@/test-utils/rtl';

import { completeActivityTaskEvent } from '../../__fixtures__/workflow-history-activity-events';
import { workflowPageUrlParams } from '../../__fixtures__/workflow-page-url-params';
import getGroupedHistoryEventDetails from '../helpers/get-grouped-history-event-details';
import WorkflowHistoryEventDetails from '../workflow-history-event-details';

jest.mock('@/utils/data-formatters/format-workflow-history-event', () =>
  jest.fn((event) => (event ? { mockFormatted: true } : null))
);

jest.mock('../helpers/get-grouped-history-event-details', () => jest.fn());
const mockGetGroupedHistoryEventDetails =
  getGroupedHistoryEventDetails as jest.Mock;

jest.mock(
  '../../workflow-history-event-details-recursive/workflow-history-event-details-recursive',
  () =>
    jest.fn(({ details }) => <div>Mock details: {JSON.stringify(details)}</div>)
);

describe(WorkflowHistoryEventDetails.name, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders null when detailsEntries is empty', () => {
    mockGetGroupedHistoryEventDetails.mockReturnValue([]);

    render(
      <WorkflowHistoryEventDetails
        event={completeActivityTaskEvent}
        decodedPageUrlParams={workflowPageUrlParams}
      />
    );
    expect(screen.getByText('No Details')).toBeInTheDocument();
  });

  it('renders details with path and value', () => {
    mockGetGroupedHistoryEventDetails.mockReturnValue({
      testKey: 'testValue',
    });

    render(
      <WorkflowHistoryEventDetails
        event={completeActivityTaskEvent}
        decodedPageUrlParams={workflowPageUrlParams}
      />
    );

    expect(screen.getByText(/"testKey":"testValue"/)).toBeInTheDocument();
  });
});
