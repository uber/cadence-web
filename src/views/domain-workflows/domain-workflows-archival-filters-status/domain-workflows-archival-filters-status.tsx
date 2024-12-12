'use client';
import React from 'react';

import { FormControl } from 'baseui/form-control';
import { Select, SIZE } from 'baseui/select';

import { type PageFilterComponentProps } from '@/components/page-filters/page-filters.types';
import { type WorkflowStatus } from '@/views/shared/workflow-status-tag/workflow-status-tag.types';

import { WORKFLOW_STATUS_OPTIONS } from '../domain-workflows-filters-status/domain-workflows-filters-status.constants';

import { overrides } from './domain-workflows-archival-filters-status.styles';
import { type DomainWorkflowsArchivalFiltersStatusValue } from './domain-workflows-archival-filters-status.types';

export default function DomainWorkflowsArchivalFiltersStatus({
  value,
  setValue,
}: PageFilterComponentProps<DomainWorkflowsArchivalFiltersStatusValue>) {
  const statusOptionValue = WORKFLOW_STATUS_OPTIONS.filter(
    (option) => option.id === value.statusArchival
  );

  return (
    <FormControl label="Status" overrides={overrides.selectFormControl}>
      <Select
        size={SIZE.compact}
        value={statusOptionValue}
        options={WORKFLOW_STATUS_OPTIONS}
        onChange={(params) =>
          setValue({
            statusArchival: WORKFLOW_STATUS_OPTIONS.find(
              (opt) => opt.id === params.value[0]?.id
            )
              ? (String(params.value[0]?.id) as WorkflowStatus)
              : undefined,
          })
        }
        placeholder="Show all statuses"
      />
    </FormControl>
  );
}
