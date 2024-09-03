import { type Theme, styled as createStyled } from 'baseui';

import type { StyletronCSSObjectValue } from '@/hooks/use-styletron-classes';

import getBadgeContainerSize from './helpers/get-badge-container-size';
import { WORKFLOW_EVENT_STATUS } from './workflow-history-event-status-badge.constants';
import type {
  Props,
  WorkflowEventStatusBadgeSize,
} from './workflow-history-event-status-badge.types';

export const styled = {
  BadgeContainer: createStyled<
    'div',
    { $status: Props['status']; $size: WorkflowEventStatusBadgeSize }
  >('div', ({ $size, $status, $theme }) => {
    const containerSizeMap = getBadgeContainerSize($theme);

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '16px',
      width: containerSizeMap[$size],
      height: containerSizeMap[$size],
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
    };
  }),
};
