import { z } from 'zod';

import { type SortingOrder } from '@/components/table/table.types';
import isWorkflowStatus from '@/views/shared/workflow-status-tag/helpers/is-workflow-status';
import { type WorkflowStatus } from '@/views/shared/workflow-status-tag/workflow-status-tag.types';
import getTimestampNsFromISO from '@/utils/datetime/get-timestamp-ns-from-iso';

export const listWorkflowsQueryParamSchema = z.object({
  search: z.string().optional(),
  status: z
    .custom<WorkflowStatus>(isWorkflowStatus, {
      message: 'Invalid workflow status',
    })
    .optional(),
  startTimestamp: z
    .string()
    .datetime()
    .transform(getTimestampNsFromISO)
    .optional(),
  endTimestamp: z
    .string()
    .datetime()
    .transform(getTimestampNsFromISO)
    .optional(),
  sortColumn: z.string().optional(),
  sortOrder: z
    .custom<SortingOrder>(
      (arg): arg is SortingOrder => arg === 'ASC' || arg === 'DESC',
      {
        message: 'Invalid sort order',
      }
    )
    .optional(),
  nextPage: z.string().optional(),
});

export type ListWorkflowsHandlerQueryParams = z.input<
  typeof listWorkflowsQueryParamSchema
>;
