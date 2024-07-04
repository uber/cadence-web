import { type DomainPageWorkflowsFiltersConfig } from '../domain-page-workflows-filters/domain-page-workflows-filters.types';
import DomainPageWorkflowsFiltersDates from '../domain-page-workflows-filters-dates/domain-page-workflows-filters-dates';
import DomainPageWorkflowsFiltersStatus from '../domain-page-workflows-filters-status/domain-page-workflows-filters-status';

const domainPageWorkflowsFiltersConfig = [
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
] as const satisfies DomainPageWorkflowsFiltersConfig;

export default domainPageWorkflowsFiltersConfig;
