import { z } from 'zod';

import { type SortingOrder } from '@/components/table/table.types';
import isWorkflowStatus from '@/views/shared/workflow-status-tag/helpers/is-workflow-status';

export const listWorkflowsQueryParamSchema = z.object({
  search: z.string().optional(),
  status: z
    .string()
    .refine(isWorkflowStatus, { message: 'Invalid workflow status' })
    .optional(),
  startTimestamp: z.string().datetime().optional(),
  endTimestamp: z.string().datetime().optional(),
  sortColumn: z.string().optional(),
  sortOrder: z
    .string()
    .refine((arg): arg is SortingOrder => arg === 'ASC' || arg === 'DESC', {
      message: 'Invalid sort order',
    })
    .optional(),
  nextPage: z.string().optional(),
});

export type ListWorkflowsHandlerQueryParams = z.infer<
  typeof listWorkflowsQueryParamSchema
>;
