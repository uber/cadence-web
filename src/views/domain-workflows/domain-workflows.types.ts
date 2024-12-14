import { type RouteParams as ListWorkflowsRouteParams } from '@/route-handlers/list-workflows/list-workflows.types';
import { type SortOrder } from '@/utils/sort-by';

import { type DomainPageTabContentProps } from '../domain-page/domain-page-content/domain-page-content.types';
import { type WorkflowStatus } from '../shared/workflow-status-tag/workflow-status-tag.types';

import { type DomainWorkflowsHeaderInputType } from './domain-workflows-header/domain-workflows-header.types';

export type UseListWorkflowsParams = ListWorkflowsRouteParams & {
  isArchival?: boolean;
  pageSize?: number;
};

export type DomainWorkflowsQueryParamsValues = {
  inputType: DomainWorkflowsHeaderInputType;
  search?: string;
  status?: WorkflowStatus;
  timeRangeStart?: Date;
  timeRangeEnd?: Date;
  sortColumn: string;
  sortOrder: SortOrder;
  query: string;
};

export type Props = DomainPageTabContentProps & {
  isArchival?: boolean;
};
