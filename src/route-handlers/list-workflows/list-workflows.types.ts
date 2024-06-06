import { z } from 'zod';
import listWorkflowsQueryParamSchema from './schemas/list-workflows-query-params-schema';

export type RouteParams = {
  domain: string;
  cluster: string;
};

export type Props = {
  params: RouteParams;
};

export type ListWorkflowsHandlerQueryParams = z.input<
  typeof listWorkflowsQueryParamSchema
>;
