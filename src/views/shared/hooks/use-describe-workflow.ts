'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { type DescribeWorkflowResponse } from '@/route-handlers/describe-workflow/describe-workflow.types';
import request from '@/utils/request';
import { type RequestError } from '@/utils/request/request-error';

const DEFAULT_REFRESH_INTERVAL_MS = 10000;

type Props = {
  domain: string;
  cluster: string;
  workflowId: string;
  runId: string;
  refreshInterval?: number;
};

export default function useDescribeWorkflow({
  refreshInterval = DEFAULT_REFRESH_INTERVAL_MS,
  ...params
}: Props) {
  return useSuspenseQuery<
    DescribeWorkflowResponse,
    RequestError,
    DescribeWorkflowResponse,
    [string, typeof params]
  >({
    queryKey: ['describe_workflow', params] as const,
    queryFn: ({ queryKey: [_, p] }) =>
      request(
        `/api/domains/${p.domain}/${p.cluster}/workflows/${p.workflowId}/${p.runId}`
      ).then((res) => res.json()),
    refetchInterval: (query) => {
      const { closeStatus } = query.state.data?.workflowExecutionInfo || {};
      if (
        !closeStatus ||
        closeStatus === 'WORKFLOW_EXECUTION_CLOSE_STATUS_INVALID'
      )
        return refreshInterval;

      return false;
    },
  });
}
