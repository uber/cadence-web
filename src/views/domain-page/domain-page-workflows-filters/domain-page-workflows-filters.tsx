'use client';
import PageSection from '@/components/page-section/page-section';
import PageFilters from '@/components/page-filters/page-filters';
import domainPageQueryParamsConfig from '../config/domain-page-query-params.config';
import domainPageWorkflowsFiltersConfig from '../config/domain-page-workflows-filters.config';

export default function DomainPageWorkflowsFilters() {
  return (
    <PageSection>
      <PageFilters
        searchId="search"
        searchPlaceholder="Find workflow"
        pageFiltersConfig={domainPageWorkflowsFiltersConfig}
        pageQueryParamsConfig={domainPageQueryParamsConfig}
      />
    </PageSection>
  );
}
