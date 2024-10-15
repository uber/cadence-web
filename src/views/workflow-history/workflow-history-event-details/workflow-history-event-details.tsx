'use client';
import React, { useMemo } from 'react';

import { isObjectLike } from 'lodash';

import useStyletronClasses from '@/hooks/use-styletron-classes';
import formatWorkflowHistoryEvent from '@/utils/data-formatters/format-workflow-history-event';
import { type WorkflowPageTabsParams } from '@/views/workflow-page/workflow-page-tabs/workflow-page-tabs.types';

import getDetailsFieldLabel from './helpers/get-details-field-label';
import getGroupedHistoryEventDetails from './helpers/get-grouped-history-event-details';
import getHistoryEventFieldRenderConfig from './helpers/get-history-event-field-render-config';
import { cssStyles, styled } from './workflow-history-event-details.styles';
import type { Props } from './workflow-history-event-details.types';

function RecursiveDetails({
  details,
  prefix,
  decodedPageUrlParams,
}: {
  details: object;
  prefix: string;
  decodedPageUrlParams: WorkflowPageTabsParams;
}) {
  const { cls } = useStyletronClasses(cssStyles);

  return (
    <div>
      {Object.entries(details).map(([key, value], index) => {
        const path = (prefix ? prefix + '.' : '') + key;

        const renderConfig = getHistoryEventFieldRenderConfig({
          key,
          path,
          value: value,
        });

        const isGenericObject =
          isObjectLike(value) && !renderConfig?.valueComponent;

        return (
          <styled.DetailsRow
            $forceWrap={renderConfig?.forceWrap || isGenericObject}
            key={`${key}-${path}-${renderConfig?.name}-${index}`}
          >
            <div className={cls.detailsLabel}>
              {getDetailsFieldLabel({
                entry: { key, path, value, renderConfig },
                isGenericObject,
              })}
            </div>
            <styled.DetailsValue
              $forceWrap={renderConfig?.forceWrap || isGenericObject}
            >
              {renderConfig?.valueComponent ? (
                <renderConfig.valueComponent
                  entryKey={key}
                  entryPath={path}
                  entryValue={value}
                  {...decodedPageUrlParams}
                />
              ) : isObjectLike(value) ? (
                <div className={cls.indentedDetails}>
                  <RecursiveDetails
                    details={value}
                    prefix={path}
                    decodedPageUrlParams={decodedPageUrlParams}
                  />
                </div>
              ) : (
                String(value)
              )}
            </styled.DetailsValue>
          </styled.DetailsRow>
        );
      })}
    </div>
  );
}

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
    <RecursiveDetails
      details={eventDetails}
      prefix=""
      decodedPageUrlParams={decodedPageUrlParams}
    />
  );
}
