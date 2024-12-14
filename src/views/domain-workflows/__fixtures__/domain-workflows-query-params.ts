import { type PageQueryParamValues } from '@/hooks/use-page-query-params/use-page-query-params.types';
import type domainPageQueryParamsConfig from '@/views/domain-page/config/domain-page-query-params.config';

export const mockDomainWorkflowsQueryParamsValues: PageQueryParamValues<
  typeof domainPageQueryParamsConfig
> = {
  inputType: 'search',
  search: '',
  status: undefined,
  timeRangeStart: undefined,
  timeRangeEnd: undefined,
  sortColumn: 'startTime',
  sortOrder: 'DESC',
  query: '',
  workflowId: '',
  workflowType: '',
  statusBasic: undefined,
  inputTypeArchival: 'search',
  searchArchival: '',
  statusArchival: undefined,
  timeRangeStartArchival: undefined,
  timeRangeEndArchival: undefined,
  sortColumnArchival: 'startTime',
  sortOrderArchival: 'DESC',
  queryArchival: '',
};

export const mockDateOverrides = {
  timeRangeStart: new Date(1684800000000), // 23 May 2023 00:00
  timeRangeEnd: new Date(1684886400000), // 24 May 2023 00:00
};

export const mockDateOverridesArchival = {
  timeRangeStartArchival: new Date(1684800000000), // 23 May 2023 00:00
  timeRangeEndArchival: new Date(1684886400000), // 24 May 2023 00:00
};
