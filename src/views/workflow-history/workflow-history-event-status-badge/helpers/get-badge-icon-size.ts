import type { Theme } from 'baseui';

import { type WorkflowEventStatusBadgeSize } from '../workflow-history-event-status-badge.types';

export default function getBadgeIconSize(
  theme: Theme
): Record<WorkflowEventStatusBadgeSize, string> {
  return {
    small: theme.sizing.scale400,
    medium: theme.sizing.scale550,
  };
}
