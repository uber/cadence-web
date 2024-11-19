import React from 'react';

import { type DomainPageTabContentProps } from '@/views/domain-page/domain-page-content/domain-page-content.types';

import DomainWorkflowsInput from './domain-workflows-input/domain-workflows-input';
import DomainWorkflowsTable from './domain-workflows-table/domain-workflows-table';

export default function DomainWorkflows(props: DomainPageTabContentProps) {
  return (
    <>
      <DomainWorkflowsInput />
      <DomainWorkflowsTable domain={props.domain} cluster={props.cluster} />
    </>
  );
}
