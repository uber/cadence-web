import { type PageFilterConfig } from '@/components/page-filters/page-filters.types';

import { type DomainPageWorkflowFiltersDatesValue } from '../domain-page-workflows-filters-dates/domain-page-workflow-filters-dates.types';
import DomainPageWorkflowsFiltersDates from '../domain-page-workflows-filters-dates/domain-page-workflows-filters-dates';
import { type DomainPageWorkflowFiltersStatusValue } from '../domain-page-workflows-filters-status/domain-page-workflow-filters-status-types';
import DomainPageWorkflowsFiltersStatus from '../domain-page-workflows-filters-status/domain-page-workflows-filters-status';

import type domainPageQueryParamsConfig from './domain-page-query-params.config';

const domainPageWorkflowsFiltersConfig: [
  PageFilterConfig<
    typeof domainPageQueryParamsConfig,
    DomainPageWorkflowFiltersStatusValue
  >,
  PageFilterConfig<
    typeof domainPageQueryParamsConfig,
    DomainPageWorkflowFiltersDatesValue
  >,
] = [
  {
    id: 'status',
    getValue: (v) => ({ status: v.status }),
    component: DomainPageWorkflowsFiltersStatus,
  },
  {
    id: 'dates',
    getValue: (v) => ({
      timeRangeStart: v.timeRangeStart,
      timeRangeEnd: v.timeRangeEnd,
    }),
    component: DomainPageWorkflowsFiltersDates,
  },
] as const;

export default domainPageWorkflowsFiltersConfig;
