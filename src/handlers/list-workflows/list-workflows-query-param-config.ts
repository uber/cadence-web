import { type PageQueryParam } from '@/hooks/use-page-query-params/use-page-query-params.types';
import { type SortingOrder } from '@/components/table/table.types';
import { type WorkflowStatus } from '@/views/shared/workflow-status-tag/workflow-status-tag.types';
import isWorkflowStatus from '@/views/shared/workflow-status-tag/helpers/is-workflow-status';

const listWorkflowsQueryParamConfig: [
  PageQueryParam<'search', string>,
  PageQueryParam<'status', WorkflowStatus | undefined>,
  PageQueryParam<'startTimestamp', string | undefined>,
  PageQueryParam<'endTimestamp', string | undefined>,
  PageQueryParam<'sortColumn', string>,
  PageQueryParam<'sortOrder', SortingOrder>,
  PageQueryParam<'nextPage', string | undefined>,
] = [
  {
    key: 'search',
    defaultValue: '',
  },
  {
    key: 'status',
    parseValue: (value: string) =>
      isWorkflowStatus(value) ? value : undefined,
  },
  {
    key: 'startTimestamp',
    queryParamKey: 'start',
  },
  {
    key: 'endTimestamp',
    queryParamKey: 'end',
  },
  {
    key: 'sortColumn',
    queryParamKey: 'column',
    defaultValue: 'startTime',
  },
  {
    key: 'sortOrder',
    queryParamKey: 'order',
    defaultValue: 'DESC',
    parseValue: (value: string) => (value === 'ASC' ? 'ASC' : 'DESC'),
  },
  {
    key: 'nextPage',
    queryParamKey: 'next',
  },
] as const;

export default listWorkflowsQueryParamConfig;
