import { type PageFilterConfig } from '@/components/page-filters/page-filters.types';

import type domainPageQueryParamsConfig from '../config/domain-page-query-params.config';
import { type DomainPageWorkflowFiltersDatesValue } from '../domain-page-workflows-filters-dates/domain-page-workflow-filters-dates.types';
import { type DomainPageWorkflowFiltersStatusValue } from '../domain-page-workflows-filters-status/domain-page-workflow-filters-status-types';

export type DomainPageWorkflowsFiltersConfig = [
  PageFilterConfig<
    typeof domainPageQueryParamsConfig,
    DomainPageWorkflowFiltersStatusValue
  >,
  PageFilterConfig<
    typeof domainPageQueryParamsConfig,
    DomainPageWorkflowFiltersDatesValue
  >,
];
