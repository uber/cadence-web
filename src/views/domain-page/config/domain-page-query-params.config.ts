import { PageQueryParam } from '@/hooks/use-page-query-params/use-page-query-params.types';
import { SortingOrder } from '@/components/table/table.types';

const domainPageQueryParamsConfig: [
  PageQueryParam<'search', string>,
  PageQueryParam<'status', string>,
  PageQueryParam<'startDate', Date>,
  PageQueryParam<'endDate', Date>,
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
  },
  {
    key: 'sortOrder',
    queryParamKey: 'order',
  },
] as const;

export default domainPageQueryParamsConfig;
