import React from 'react';

import { render, screen, within } from '@/test-utils/rtl';

import { workflowPageUrlParams } from '../../__fixtures__/workflow-page-url-params';
import WorkflowHistoryEventDetailsRecursive from '../workflow-history-event-details-recursive';

jest.mock(
  '../../workflow-history-event-details-base-value/workflow-history-event-details-base-value',
  () => jest.fn(({ entryValue }) => <div>{String(entryValue)}</div>)
);

jest.mock(
  '../../workflow-history-event-details/helpers/get-history-event-field-render-config',
  () =>
    jest.fn().mockImplementation(({ value }) => {
      if (value instanceof Date) {
        return {
          name: 'Mock render config for dates',
          // Note: due to the way this mock is written, the custom matcher is never used
          customMatcher: ({ value }: { value: any }) => value instanceof Date,
          // Note: we are not actually rendering ISO strings in this test, we are
          // passing valueComponent only to prevent further recursion for date objects
          valueComponent: ({ entryValue }: { entryValue: Date }) =>
            entryValue.toISOString(),
        };
      }
      return {
        name: 'Mock render config for everything else',
        customMatcher: () => false,
      };
    })
);

jest.mock('../helpers/get-details-field-label', () =>
  jest.fn().mockImplementation(({ entry: { key } }) => key)
);

const mockWorkflowHistoryDetails = {
  version: '1',
  taskId: '1234567890',
  eventId: 1,
  timestamp: new Date('2024-10-14T12:34:18.721Z'),
  'header.fields': {
    'mockField1.data': 'mock-data-1',
    'mockField2.data': 'mock-data-2',
    'mockField3.data': {
      subField: 'mock-data-3.1',
      subTimestamp: new Date('2024-10-14T11:34:18.721Z'),
    },
  },
};

describe(WorkflowHistoryEventDetailsRecursive.name, () => {
  it('renders without crashing', () => {
    render(
      <WorkflowHistoryEventDetailsRecursive
        details={mockWorkflowHistoryDetails}
        decodedPageUrlParams={workflowPageUrlParams}
      />
    );
  });

  it('renders the correct number of divs', () => {
    render(
      <WorkflowHistoryEventDetailsRecursive
        details={mockWorkflowHistoryDetails}
        decodedPageUrlParams={workflowPageUrlParams}
      />
    );

    const detailsRows = screen.getAllByTestId('details-row');
    // The mock details object has 10 key-value pairs in total, including children
    expect(detailsRows).toHaveLength(10);
  });

  it('stops recursion if an object has a value component defined in its render config', () => {
    render(
      <WorkflowHistoryEventDetailsRecursive
        details={mockWorkflowHistoryDetails}
        decodedPageUrlParams={workflowPageUrlParams}
      />
    );

    const detailsRows = screen.getAllByTestId('details-row');

    const firstDate = detailsRows[3];
    expect(
      within(firstDate).getByText(/Mon Oct 14 2024 12:34:18/)
    ).toBeDefined();

    const secondDate = detailsRows[9];
    expect(
      within(secondDate).getByText(/Mon Oct 14 2024 11:34:18/)
    ).toBeDefined();
  });

  it('renders nested details correctly', () => {
    render(
      <WorkflowHistoryEventDetailsRecursive
        details={mockWorkflowHistoryDetails}
        decodedPageUrlParams={workflowPageUrlParams}
      />
    );

    const detailsRows = screen.getAllByTestId('details-row');

    const headerSubRows = within(detailsRows[4]).getAllByTestId('details-row');
    expect(headerSubRows).toHaveLength(5);

    const field3SubRows = within(headerSubRows[2]).getAllByTestId(
      'details-row'
    );
    expect(field3SubRows).toHaveLength(2);
  });
});
