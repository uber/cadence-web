'use client';
import React from 'react';

import { Accordion, Panel } from 'baseui/accordion';

import useStyletronClasses from '@/hooks/use-styletron-classes';

import WorkflowHistoryEventStatusBadge from '../workflow-history-event-status-badge/workflow-history-event-status-badge';

import { cssStyles, overrides } from './workflow-history-events-card.styles';
import { type Props } from './workflow-history-events-card.types';

export default function WorkflowHistoryEventsCard({ eventsMetadata }: Props) {
  const { cls } = useStyletronClasses(cssStyles);

  if (!eventsMetadata?.length) return null;
  return (
    <Accordion overrides={overrides.accordion} accordion>
      {eventsMetadata.map((event) => {
        return (
          <Panel
            title={
              <>
                <WorkflowHistoryEventStatusBadge
                  size="small"
                  status={event.status}
                />
                <div className={cls.eventLabel}>{event.label}</div>
              </>
            }
          >
            Placeholder text
          </Panel>
        );
      })}
    </Accordion>
  );
}
