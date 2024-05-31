import type { WorkflowStatus } from '@/views/shared/workflow-status-tag/workflow-status-tag.types';

export type DomainWorkflow = {
  workflowID: string;
  runID: string;
  workflowName: string;
  status: WorkflowStatus;
  startTime: number;
  closeTime: number | null | undefined;
};
