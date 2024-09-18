import { type QueryRejected } from '@/__generated__/proto-ts/uber/cadence/api/v1/QueryRejected';

export type RouteParams = {
  domain: string;
  cluster: string;
  workflowId: string;
  runId: string;
};

export type RequestParams = {
  params: RouteParams;
};

export type QueryWorkflowResponse = {
  result: object;
  rejected: QueryRejected;
};
