'use client';
import React from 'react';

import { HeadingXSmall } from 'baseui/typography';

import useStyletronClasses from '@/hooks/use-styletron-classes';
import type { WorkflowPageTabContentProps } from '@/views/workflow-page/workflow-page-tab-content/workflow-page-tab-content.types';

import WorkflowHistoryEventStatusBadge from './workflow-history-event-status-badge/workflow-history-event-status-badge';
import { WORKFLOW_EVENT_STATUS } from './workflow-history-event-status-badge/workflow-history-event-status-badge.constants';
import { cssStyles } from './workflow-history.styles';

export default function WorkflowHistory({
  params,
}: WorkflowPageTabContentProps) {
  const { cls } = useStyletronClasses(cssStyles);

  return (
    <div className={cls.pageContainer}>
      <HeadingXSmall>Workflow history</HeadingXSmall>
      <div className={cls.eventsContainer}>
        <section className={cls.compactSection}>
          <p>compact</p>
        </section>
        <section className={cls.timelineSection}>
          <p>timeline</p>
        </section>
      </div>
    </div>
  );
}
