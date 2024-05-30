'use server';
import { cache } from 'react';
import * as grpcClient from '@/utils/grpc/grpc-client';
import type { WorkflowStatus } from '@/views/shared/workflow-status-tag/workflow-status-tag.types';
import type { SortingOrder } from '@/components/table/table.types';

export type ArgsType = {
  domain: string;
  search?: string;
  workflowStatus?: WorkflowStatus;
  sortColumn?: string;
  sortOrder?: SortingOrder;
  startTimeRangeStart?: number;
  startTimeRangeEnd?: number;
  nextPage?: any;
};
// TODO @adhitya.mamallan - use GRPC types here when they are ready
export const listWorkflowExecutions = async (
  clusterName: string,
  args: ArgsType
) => {
  // How will errors be handled?
  const result =
    await grpcClient.clusterMethods[clusterName].describeDomain(args);

  return result;
};

export const listCachedWorkflowExecutions = cache(listWorkflowExecutions);
