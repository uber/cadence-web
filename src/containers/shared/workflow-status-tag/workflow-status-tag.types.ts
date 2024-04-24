export type WorkflowStatus =
  | 'running'
  | 'completed'
  | 'failed'
  | 'canceled'
  | 'terminated'
  | 'continuedAsNew'
  | 'timedOut'
  | 'unknown';

export type WorkflowStatusTagProps = {
  status: WorkflowStatus;
  link?: string;
};

export type WorkflowStatusTagOverridesProps = {
  status: WorkflowStatus;
};
