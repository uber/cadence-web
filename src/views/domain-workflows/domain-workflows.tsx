import React from 'react';

import DomainWorkflowsHeader from './domain-workflows-header/domain-workflows-header';
import DomainWorkflowsTable from './domain-workflows-table/domain-workflows-table';
import { type Props } from './domain-workflows.types';

export default function DomainWorkflows(props: Props) {
  return (
    <>
      <DomainWorkflowsHeader
        domain={props.domain}
        cluster={props.cluster}
        isArchival={props.isArchival}
      />
      <DomainWorkflowsTable
        domain={props.domain}
        cluster={props.cluster}
        isArchival={props.isArchival}
      />
    </>
  );
}
