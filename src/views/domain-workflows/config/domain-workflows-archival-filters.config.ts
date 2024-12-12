import { type PageFilterConfig } from '@/components/page-filters/page-filters.types';
import type domainPageQueryParamsConfig from '@/views/domain-page/config/domain-page-query-params.config';

import DomainWorkflowsArchivalFiltersDates from '../domain-workflows-archival-filters-dates/domain-workflows-archival-filters-dates';
import { type DomainWorkflowsArchivalFiltersDatesValue } from '../domain-workflows-archival-filters-dates/domain-workflows-archival-filters-dates.types';
import DomainWorkflowsArchivalFiltersStatus from '../domain-workflows-archival-filters-status/domain-workflows-archival-filters-status';
import { type DomainWorkflowsArchivalFiltersStatusValue } from '../domain-workflows-archival-filters-status/domain-workflows-archival-filters-status.types';

const domainWorkflowsArchivalFiltersConfig: [
  PageFilterConfig<
    typeof domainPageQueryParamsConfig,
    DomainWorkflowsArchivalFiltersStatusValue
  >,
  PageFilterConfig<
    typeof domainPageQueryParamsConfig,
    DomainWorkflowsArchivalFiltersDatesValue
  >,
] = [
  {
    id: 'status',
    getValue: (v) => ({ statusArchival: v.statusArchival }),
    formatValue: (v) => ({ statusArchival: v.statusArchival }),
    component: DomainWorkflowsArchivalFiltersStatus,
  },
  {
    id: 'dates',
    getValue: (v) => ({
      timeRangeStartArchival: v.timeRangeStartArchival,
      timeRangeEndArchival: v.timeRangeEndArchival,
    }),
    formatValue: (v) => ({
      timeRangeStartArchival: v.timeRangeStartArchival?.toISOString(),
      timeRangeEndArchival: v.timeRangeEndArchival?.toISOString(),
    }),
    component: DomainWorkflowsArchivalFiltersDates,
  },
] as const;

export default domainWorkflowsArchivalFiltersConfig;
