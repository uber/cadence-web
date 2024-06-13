import { type TableColumn } from '@/components/table/table.types';
import formatDate from '@/utils/data-formatters/format-date';
import WorkflowStatusTag from '@/views/shared/workflow-status-tag/workflow-status-tag';

import { type DomainWorkflow } from '../domain-page.types';

const domainPageWorkflowsTableConfig: Array<TableColumn<DomainWorkflow>> = [
  {
    name: 'Workflow ID',
    id: 'WorkflowID',
    renderCell: (row: DomainWorkflow) => row.workflowID,
    width: '27.5%',
  },
  {
    name: 'Status',
    id: 'CloseStatus',
    renderCell: WorkflowStatusTag,
    width: '7.5%',
  },
  {
    name: 'Run ID',
    id: 'RunID',
    renderCell: (row: DomainWorkflow) => row.runID,
    width: '20%',
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
    renderCell: (row: DomainWorkflow) => formatDate(row.startTime),
    width: '12.5%',
    sortable: true,
  },
  {
    name: 'Ended',
    id: 'CloseTime',
    renderCell: (row: DomainWorkflow) =>
      row.closeTime ? formatDate(row.closeTime) : 'Ongoing',
    width: '12.5%',
    sortable: true,
  },
];

export default domainPageWorkflowsTableConfig;
