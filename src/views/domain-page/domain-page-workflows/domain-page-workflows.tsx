import React, { Suspense } from 'react';

import { type DomainPageTabContentProps } from '../domain-page-content/domain-page-content.types';
import DomainPageWorkflowsFilters from '../domain-page-workflows-filters/domain-page-workflows-filters';
import DomainPageWorkflowsTable from '../domain-page-workflows-table/domain-page-workflows-table';

export default function DomainPageWorkflows(props: DomainPageTabContentProps) {
  return (
    <>
      <DomainPageWorkflowsFilters />
      <Suspense>
        <DomainPageWorkflowsTable
          domain={props.domain}
          cluster={props.cluster}
        />
      </Suspense>
    </>
  );
}
