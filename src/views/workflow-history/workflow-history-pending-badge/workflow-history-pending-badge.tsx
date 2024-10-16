'use client';
import React from 'react';

import { Badge } from 'baseui/badge';
import { useParams } from 'next/navigation';

import useDescribeWorkflow from '@/views/shared/hooks/use-describe-workflow';
import { type WorkflowPageTabsParams } from '@/views/workflow-page/workflow-page-tabs/workflow-page-tabs.types';

import { overrides } from './workflow-history-pending-badge.styles';

export default function WorkflowHistoryPendingBadge() {
  const params = useParams<WorkflowPageTabsParams>();
  const { workflowTab: _, ...restParams } = params;

  const { data: workflowDetails } = useDescribeWorkflow({
    ...restParams,
  });

  const totalPending =
    (workflowDetails.pendingDecision ? 1 : 0) +
    workflowDetails.pendingActivities.length +
    workflowDetails.pendingChildren.length;

  if (totalPending === 0) {
    return null;
  }

  return (
    <Badge content={`${totalPending} pending`} overrides={overrides.badge} />
  );
}
