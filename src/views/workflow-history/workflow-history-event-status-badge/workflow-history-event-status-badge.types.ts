import { type WORKFLOW_EVENT_STATUS } from './workflow-history-event-status-badge.constants';

export type WorkflowEventStatusBadgeSize = 'small' | 'medium';

export type Props = {
  status: (typeof WORKFLOW_EVENT_STATUS)[keyof typeof WORKFLOW_EVENT_STATUS];
  size?: WorkflowEventStatusBadgeSize;
};
