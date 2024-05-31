'use server';
import { cache } from 'react';
import * as grpcClient from '@/utils/grpc/grpc-client';
import type { WorkflowStatus } from '@/views/shared/workflow-status-tag/workflow-status-tag.types';
import type { SortingOrder } from '@/components/table/table.types';

import getListWorkflowExecutionsQuery from '../helpers/get-list-workflow-executions-query';
import mapExecutionsToWorkflows from '../helpers/map-executions-to-workflows';

const PAGE_SIZE = 10;

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
  const {
    domain,
    nextPage,
    search,
    workflowStatus,
    sortColumn,
    sortOrder,
    startTimeRangeStart,
    startTimeRangeEnd,
  } = args;

  let result;
  try {
    result = await grpcClient.clusterMethods[
      clusterName
    ].listWorkflowExecutions({
      domain: domain,
      pageSize: PAGE_SIZE,
      nextPageToken: nextPage ? Buffer.from(nextPage, 'utf8') : undefined,
      query: getListWorkflowExecutionsQuery({
        search,
        workflowStatus,
        sortColumn,
        sortOrder,
        startTimeRangeStart,
        startTimeRangeEnd,
      }),
    });
  } catch (e) {
    throw e;
  } finally {
    return {
      workflows: mapExecutionsToWorkflows(result.executions),
      nextPage: result.nextPageToken?.toString('utf8'),
    };
  }
};

export const listCachedWorkflowExecutions = cache(listWorkflowExecutions);
