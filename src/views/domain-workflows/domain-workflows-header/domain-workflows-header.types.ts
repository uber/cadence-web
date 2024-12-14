import { type ListWorkflowsRequestQueryParams } from '@/route-handlers/list-workflows/list-workflows.types';

export type DomainWorkflowsHeaderInputType =
  ListWorkflowsRequestQueryParams['inputType'];

export type Props = {
  domain: string;
  cluster: string;
  isArchival?: boolean;
};
