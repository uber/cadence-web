import type { Theme } from 'baseui';

import { type WorkflowEventStatusBadgeSize } from '../workflow-history-event-status-badge.types';

export default function getBadgeContainerSize(
  theme: Theme
): Record<WorkflowEventStatusBadgeSize, string> {
  return {
    small: theme.sizing.scale600,
    medium: theme.sizing.scale800,
  };
}
