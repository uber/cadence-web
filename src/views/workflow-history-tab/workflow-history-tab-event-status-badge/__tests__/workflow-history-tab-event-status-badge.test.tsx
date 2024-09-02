import React from 'react';

import { render } from '@/test-utils/rtl';

import WorkflowHistoryTabEventStatusBadge from '../workflow-history-tab-event-status-badge';
import {
  WORKFLOW_EVENT_STATUS,
  WORKFLOW_EVENT_STATUS_BADGE_SIZES,
} from '../workflow-history-tab-event-status-badge.constants';

describe('WorkflowHistoryTabEventStatusBadge', () => {
  it('should match snapshot when status is not valid and badge should not be rendered', () => {
    const { container } = render(
      // @ts-expect-error invalid status
      <WorkflowHistoryTabEventStatusBadge status="INVALID_STATUS" />
    );
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when size is not valid and icon should not be rendered', () => {
    const { container } = render(
      // @ts-expect-error invalid size
      <WorkflowHistoryTabEventStatusBadge status="COMPLETE" size="invalid" />
    );
    expect(container).toMatchSnapshot();
  });
  // snapshot tests for possible combinations of status and size
  for (const status of Object.values(WORKFLOW_EVENT_STATUS)) {
    for (const size of Object.values(WORKFLOW_EVENT_STATUS_BADGE_SIZES)) {
      it(`should match snapshot when status is ${status} and size is ${size}`, () => {
        const { container } = render(
          <WorkflowHistoryTabEventStatusBadge status={status} size={size} />
        );
        expect(container).toMatchSnapshot();
      });
    }
  }
});
