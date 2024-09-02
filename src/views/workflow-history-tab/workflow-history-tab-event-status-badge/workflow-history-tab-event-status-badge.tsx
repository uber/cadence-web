import React from 'react';

import { Spinner } from 'baseui/spinner';
import { MdCheck, MdHourglassTop, MdReportGmailerrorred } from 'react-icons/md';

import {
  WORKFLOW_EVENT_STATUS,
  WORKFLOW_EVENT_STATUS_BADGE_SIZES,
  iconSizeMap,
} from './workflow-history-tab-event-status-badge.constants';
import { styled } from './workflow-history-tab-event-status-badge.styles';
import type { Props } from './workflow-history-tab-event-status-badge.types';

export default function WorkflowHistoryTabEventStatusBadge({
  status,
  size = WORKFLOW_EVENT_STATUS_BADGE_SIZES.medium,
}: Props) {
  if (!WORKFLOW_EVENT_STATUS[status]) return null;

  const renderIcon = () => {
    const iconSize = iconSizeMap[size];
    if (iconSize === undefined) return null;

    switch (status) {
      case WORKFLOW_EVENT_STATUS.COMPLETED:
        return <MdCheck size={iconSize} />;
      case WORKFLOW_EVENT_STATUS.FAILED:
        return <MdReportGmailerrorred size={iconSize} />;
      case WORKFLOW_EVENT_STATUS.ONGOING:
        return <Spinner $size={iconSize} />;
      case WORKFLOW_EVENT_STATUS.WAITING:
        return <MdHourglassTop size={iconSize} />;
    }
  };

  return (
    <styled.BadgeContainer $size={size} $status={status}>
      {renderIcon()}
    </styled.BadgeContainer>
  );
}
