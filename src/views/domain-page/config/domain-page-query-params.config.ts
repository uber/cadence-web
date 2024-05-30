import { PageQueryParam } from '@/hooks/use-page-query-params/use-page-query-params.types';
import { SortingOrder } from '@/components/table/table.types';
import { WorkflowStatus } from '@/views/shared/workflow-status-tag/workflow-status-tag.types';

const domainPageQueryParamsConfig: [
  PageQueryParam<'search', string>,
  PageQueryParam<'status', WorkflowStatus | undefined>,
  PageQueryParam<'startDate', Date | undefined>,
  PageQueryParam<'endDate', Date | undefined>,
  PageQueryParam<'sortColumn', string>,
  PageQueryParam<'sortOrder', SortingOrder>,
] = [
  {
    key: 'search',
    defaultValue: '',
  },
  {
    key: 'status',
  },
  {
    key: 'startDate',
    queryParamKey: 'start',
    parseValue: (timestamp: string) => new Date(timestamp),
  },
  {
    key: 'endDate',
    queryParamKey: 'end',
    parseValue: (timestamp: string) => new Date(timestamp),
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
  },
] as const;

export default domainPageQueryParamsConfig;
