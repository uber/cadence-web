import { type PageQueryParamValues } from '@/hooks/use-page-query-params/use-page-query-params.types';
import type domainPageQueryParamsConfig from '@/views/domain-page/config/domain-page-query-params.config';

import { type DomainWorkflowsQueryParamsValues } from '../domain-workflows.types';

export default function getDomainWorkflowsQueryParamsValues({
  queryParams,
  isArchival,
}: {
  queryParams: PageQueryParamValues<typeof domainPageQueryParamsConfig>;
  isArchival?: boolean;
}): DomainWorkflowsQueryParamsValues {
  if (isArchival) {
    return {
      inputType: queryParams.inputTypeArchival,
      search: queryParams.searchArchival,
      status: queryParams.statusArchival,
      timeRangeStart: queryParams.timeRangeStartArchival,
      timeRangeEnd: queryParams.timeRangeEndArchival,
      sortColumn: queryParams.sortColumnArchival,
      sortOrder: queryParams.sortOrderArchival,
      query: queryParams.queryArchival,
    };
  }

  return {
    inputType: queryParams.inputType,
    search: queryParams.search,
    status: queryParams.status,
    timeRangeStart: queryParams.timeRangeStart,
    timeRangeEnd: queryParams.timeRangeEnd,
    sortColumn: queryParams.sortColumn,
    sortOrder: queryParams.sortOrder,
    query: queryParams.query,
  };
}
