import { createElement } from 'react';

import FormattedDate from '@/components/formatted-date/formatted-date';
import Link from '@/components/link/link';
import { type TableConfig } from '@/components/table/table.types';
import { type DomainWorkflow } from '@/views/domain-page/domain-page.types';
import WorkflowStatusTag from '@/views/shared/workflow-status-tag/workflow-status-tag';

const workflowsTableSortableConfig = [
  {
    name: 'Workflow ID',
    id: 'WorkflowID',
    renderCell: (row: DomainWorkflow) => row.workflowID,
    width: '25.5%',
  },
  {
    name: 'Status',
    id: 'CloseStatus',
    renderCell: (row: DomainWorkflow) =>
      createElement(WorkflowStatusTag, { status: row.status }),
    width: '7.5%',
  },
  {
    name: 'Run ID',
    id: 'RunID',
    renderCell: (row: DomainWorkflow) =>
      createElement(
        Link,
        {
          href: `workflows/${encodeURIComponent(row.workflowID)}/${encodeURIComponent(row.runID)}`,
        },
        row.runID
      ),
    width: '22%',
  },
  {
    name: 'Workflow type',
    id: 'WorkflowType',
    renderCell: (row: DomainWorkflow) => row.workflowName,
    width: '20%',
  },
  {
    name: 'Started',
    id: 'StartTime',
    renderCell: (row: DomainWorkflow) =>
      createElement(FormattedDate, { timestampMs: row.startTime }),
    width: '12.5%',
    sortable: true,
  },
  {
    name: 'Ended',
    id: 'CloseTime',
    renderCell: (row: DomainWorkflow) =>
      createElement(FormattedDate, { timestampMs: row.closeTime }),
    width: '12.5%',
    sortable: true,
  },
] as const satisfies TableConfig<DomainWorkflow>;

export default workflowsTableSortableConfig;
