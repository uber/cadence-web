'use client';
import React, { useMemo } from 'react';

import useStyletronClasses from '@/hooks/use-styletron-classes';
import formatWorkflowHistoryEvent from '@/utils/data-formatters/format-workflow-history-event';

import WorkflowHistoryEventDetailsRecursive from '../workflow-history-event-details-recursive/workflow-history-event-details-recursive';

import getGroupedHistoryEventDetails from './helpers/get-grouped-history-event-details';
import { cssStyles } from './workflow-history-event-details.styles';
import type { Props } from './workflow-history-event-details.types';

export default function WorkflowHistoryEventDetails({
  event,
  decodedPageUrlParams,
}: Props) {
  const { cls } = useStyletronClasses(cssStyles);

  const eventDetails = useMemo(() => {
    const result = formatWorkflowHistoryEvent(event);
    if (!result) return null;
    return getGroupedHistoryEventDetails({ details: result });
  }, [event]);

  if (!eventDetails) return <div className={cls.emptyDetails}>No Details</div>;

  return (
    <WorkflowHistoryEventDetailsRecursive
      details={eventDetails}
      decodedPageUrlParams={decodedPageUrlParams}
    />
  );
}
