import { type DomainPageWorkflowsFiltersConfig } from '../domain-page-workflows-filters/domain-page-workflows-filters.types';

const domainPageWorkflowsFiltersConfig = [
  {
    id: 'status',
    queryParamKeys: ['status'],
  },
  {
    id: 'date',
    queryParamKeys: ['startDate', 'endDate'],
  },
] as const satisfies DomainPageWorkflowsFiltersConfig;

export default domainPageWorkflowsFiltersConfig;
