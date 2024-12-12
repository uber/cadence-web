import { type PageFilterConfig } from '@/components/page-filters/page-filters.types';
import type domainPageQueryParamsConfig from '@/views/domain-page/config/domain-page-query-params.config';

import DomainWorkflowsFiltersDates from '../domain-workflows-filters-dates/domain-workflows-filters-dates';
import { type DomainWorkflowsFiltersDatesValue } from '../domain-workflows-filters-dates/domain-workflows-filters-dates.types';
import DomainWorkflowsFiltersStatus from '../domain-workflows-filters-status/domain-workflows-filters-status';
import { type DomainWorkflowsFiltersStatusValue } from '../domain-workflows-filters-status/domain-workflows-filters-status.types';

const domainWorkflowsArchivalFiltersConfig: [
  PageFilterConfig<
    typeof domainPageQueryParamsConfig,
    DomainWorkflowsFiltersStatusValue
  >,
  PageFilterConfig<
    typeof domainPageQueryParamsConfig,
    DomainWorkflowsFiltersDatesValue
  >,
] = [
  {
    id: 'status',
    getValue: (v) => ({ status: v.statusArchival }),
    formatValue: (v) => ({ statusArchival: v.status }),
    component: DomainWorkflowsFiltersStatus,
  },
  {
    id: 'dates',
    getValue: (v) => ({
      timeRangeStart: v.timeRangeStartArchival,
      timeRangeEnd: v.timeRangeEndArchival,
    }),
    formatValue: (v) => ({
      timeRangeStartArchival: v.timeRangeStart?.toISOString(),
      timeRangeEndArchival: v.timeRangeEnd?.toISOString(),
    }),
    component: DomainWorkflowsFiltersDates,
  },
] as const;

export default domainWorkflowsArchivalFiltersConfig;
