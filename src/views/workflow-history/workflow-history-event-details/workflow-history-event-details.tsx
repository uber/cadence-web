'use client';
import React, { useMemo } from 'react';

import useStyletronClasses from '@/hooks/use-styletron-classes';
import formatWorkflowHistoryEvent from '@/utils/data-formatters/format-workflow-history-event';

import WorkflowHistoryEventDetailsRecursive from '../workflow-history-event-details-recursive/workflow-history-event-details-recursive';

import generateHistoryEventDetails from './helpers/generate-history-event-details';
import { cssStyles } from './workflow-history-event-details.styles';
import type { Props } from './workflow-history-event-details.types';

export default function WorkflowHistoryEventDetails({
  event,
  decodedPageUrlParams,
}: Props) {
  const { cls } = useStyletronClasses(cssStyles);

  const eventDetailsEntries = useMemo(() => {
    const result = formatWorkflowHistoryEvent(event);
    return result ? generateHistoryEventDetails({ details: result }) : [];
  }, [event]);

  if (eventDetailsEntries.length === 0)
    return <div className={cls.emptyDetails}>No Details</div>;

  return (
    <WorkflowHistoryEventDetailsRecursive
      entries={eventDetailsEntries}
      decodedPageUrlParams={decodedPageUrlParams}
    />
  );
}
