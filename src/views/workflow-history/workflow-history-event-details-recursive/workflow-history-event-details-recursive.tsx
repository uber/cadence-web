import React from 'react';

import WorkflowHistoryEventDetailsBaseValue from '../workflow-history-event-details-base-value/workflow-history-event-details-base-value';

import getDetailsFieldLabel from './helpers/get-details-field-label';
import { styled } from './workflow-history-event-details-recursive.styles';
import { type Props } from './workflow-history-event-details-recursive.types';

export default function WorkflowHistoryEventDetailsRecursive({
  entries,
  decodedPageUrlParams,
}: Props) {
  return (
    <>
      {entries.map((entry, index) => {
        const forceWrap = entry.isGroup || entry.renderConfig?.forceWrap;

        return (
          <styled.DetailsRow
            data-testid="details-row"
            $forceWrap={forceWrap}
            key={`${entry.key}-${entry.path}-${index}${
              !entry.isGroup && entry.renderConfig
                ? '-' + entry.renderConfig.name
                : ''
            }`}
          >
            <styled.DetailsLabel
              $forceWrap={forceWrap}
              $useBlackText={entry.isGroup}
            >
              {getDetailsFieldLabel(entry)}
            </styled.DetailsLabel>
            <styled.DetailsValue $forceWrap={forceWrap}>
              {entry.isGroup ? (
                <styled.IndentedDetails>
                  <WorkflowHistoryEventDetailsRecursive
                    entries={entry.groupEntries}
                    decodedPageUrlParams={decodedPageUrlParams}
                  />
                </styled.IndentedDetails>
              ) : (
                <WorkflowHistoryEventDetailsBaseValue
                  entryKey={entry.key}
                  entryPath={entry.path}
                  entryValue={entry.value}
                  renderConfig={entry.renderConfig}
                  {...decodedPageUrlParams}
                />
              )}
            </styled.DetailsValue>
          </styled.DetailsRow>
        );
      })}
    </>
  );
}
