import { WorkflowStatus } from '../workflow-status-tag.types';

export type WorkflowStatusTagIconKind = 'start' | 'end';

export type WorkflowStatusTagIconProps = {
  kind: WorkflowStatusTagIconKind;
  status: WorkflowStatus;
  link?: string;
};
