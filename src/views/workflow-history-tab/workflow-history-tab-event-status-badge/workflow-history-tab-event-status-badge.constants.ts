import type { WorkflowEventStatusBadgeSize } from './workflow-history-tab-event-status-badge.types';

export const WORKFLOW_EVENT_STATUS = {
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  ONGOING: 'ONGOING',
  WAITING: 'WAITING',
} as const;

export const WORKFLOW_EVENT_STATUS_BADGE_SIZES: Record<
  WorkflowEventStatusBadgeSize,
  WorkflowEventStatusBadgeSize
> = {
  small: 'small',
  medium: 'medium',
};

export const containerSizeMap: Record<WorkflowEventStatusBadgeSize, number> = {
  small: 16,
  medium: 24,
};

export const iconSizeMap: Record<WorkflowEventStatusBadgeSize, number> = {
  small: 10,
  medium: 14,
};
