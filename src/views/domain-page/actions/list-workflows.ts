'use server';
import { cache } from 'react';
import * as grpcClient from '@/utils/grpc/grpc-client';
import type { WorkflowStatus } from '@/views/shared/workflow-status-tag/workflow-status-tag.types';
import type { SortingOrder } from '@/components/table/table.types';

import getListWorkflowExecutionsQuery from '../../../handlers/list-workflows/helpers/get-list-workflow-executions-query';
import mapExecutionsToWorkflows from '../helpers/map-executions-to-workflows';

export type ArgsType = {
  domain: string;
  pageSize: number;
  search?: string;
  workflowStatus?: WorkflowStatus;
  sortColumn?: string;
  sortOrder?: SortingOrder;
  startTimeRangeStart?: number;
  startTimeRangeEnd?: number;
  nextPage?: any;
};

// TODO @adhitya.mamallan - use GRPC types here when they are ready
export const listWorkflows = async (clusterName: string, args: ArgsType) => {
  const {
    domain,
    pageSize,
    nextPage,
    search,
    workflowStatus,
    sortColumn,
    sortOrder,
    startTimeRangeStart,
    startTimeRangeEnd,
  } = args;

  try {
    const result = await grpcClient.clusterMethods[clusterName].listWorkflows({
      domain: domain,
      pageSize: pageSize,
      nextPageToken: nextPage ?? undefined,
      query: getListWorkflowExecutionsQuery({
        search,
        workflowStatus,
        sortColumn,
        sortOrder,
        startTimeRangeStart,
        startTimeRangeEnd,
      }),
    });
    return {
      workflows: mapExecutionsToWorkflows(result.executions),
      nextPage: result.nextPageToken,
    };
  } catch (e) {
    throw e;
  }
};

export const listCachedWorkflows = cache(listWorkflows);
