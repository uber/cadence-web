import { z } from 'zod';

import { type SortingOrder } from '@/components/table/table.types';
import isWorkflowStatus from '@/views/shared/workflow-status-tag/helpers/is-workflow-status';
import { type WorkflowStatus } from '@/views/shared/workflow-status-tag/workflow-status-tag.types';
import getTimestampNsFromISO from '@/utils/datetime/get-timestamp-ns-from-iso';

const listWorkflowsQueryParamSchema = z.object({
  pageSize: z
    .string()
    .regex(/^[1-9]\d*$/, { message: 'Page size must be a positive integer' })
    .transform((val) => parseInt(val, 10)),
  search: z.string().optional(),
  status: z
    .custom<WorkflowStatus>(isWorkflowStatus, {
      message: 'Invalid workflow status',
    })
    .optional(),
  timeRangeStart: z
    .string()
    .datetime()
    .transform(getTimestampNsFromISO)
    .optional(),
  timeRangeEnd: z
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

export default listWorkflowsQueryParamSchema;
