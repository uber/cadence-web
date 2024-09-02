import { styled as createStyled } from 'baseui';

import type { StyletronCSSObjectValue } from '@/hooks/use-styletron-classes';

import {
  WORKFLOW_EVENT_STATUS,
  containerSizeMap,
} from './workflow-history-tab-event-status-badge.constants';
import type {
  Props,
  WorkflowEventStatusBadgeSize,
} from './workflow-history-tab-event-status-badge.types';

export const styled = {
  BadgeContainer: createStyled<
    'div',
    { $status: Props['status']; $size: WorkflowEventStatusBadgeSize }
  >('div', ({ $size, $status }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px',
    width: `${containerSizeMap[$size]}px`,
    height: `${containerSizeMap[$size]}px`,
    ...(
      {
        [WORKFLOW_EVENT_STATUS.COMPLETED]: {
          color: '#009A51',
          backgroundColor: '#D3EFDA',
        },
        [WORKFLOW_EVENT_STATUS.ONGOING]: {
          backgroundColor: '#DEE9FE',
        },
        [WORKFLOW_EVENT_STATUS.FAILED]: {
          color: '#DE1135',
          backgroundColor: '#FFE1DE',
        },
        [WORKFLOW_EVENT_STATUS.WAITING]: {
          color: '#000000',
          backgroundColor: '#F3F3F3',
        },
      } satisfies Record<Props['status'], StyletronCSSObjectValue>
    )[$status],
  })),
};
