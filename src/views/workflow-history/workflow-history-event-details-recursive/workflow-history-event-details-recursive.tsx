import React from 'react';

import isObjectLike from 'lodash/isObjectLike';

import getHistoryEventFieldRenderConfig from '../workflow-history-event-details/helpers/get-history-event-field-render-config';
import WorkflowHistoryEventDetailsBaseValue from '../workflow-history-event-details-base-value/workflow-history-event-details-base-value';

import getDetailsFieldLabel from './helpers/get-details-field-label';
import { styled } from './workflow-history-event-details-recursive.styles';
import { type Props } from './workflow-history-event-details-recursive.types';

export default function WorkflowHistoryEventDetailsRecursive({
  details,
  prefix = '',
  decodedPageUrlParams,
}: Props) {
  return (
    <>
      {Object.entries(details).map(([key, value], index) => {
        const path = (prefix ? prefix + '.' : '') + key;

        const renderConfig = getHistoryEventFieldRenderConfig({
          key,
          path,
          value: value,
        });

        const isGenericObject =
          isObjectLike(value) && !renderConfig?.valueComponent;

        const forceWrap = renderConfig?.forceWrap || isGenericObject;

        return (
          <styled.DetailsRow
            data-testid="details-row"
            $forceWrap={forceWrap}
            key={`${key}-${path}-${renderConfig?.name}-${index}`}
          >
            <styled.DetailsLabel
              $forceWrap={forceWrap}
              $useBlackText={isGenericObject}
            >
              {getDetailsFieldLabel({
                entry: { key, path, value, renderConfig },
                isGenericObject,
              })}
            </styled.DetailsLabel>
            <styled.DetailsValue $forceWrap={forceWrap}>
              {isGenericObject ? (
                <styled.IndentedDetails>
                  <WorkflowHistoryEventDetailsRecursive
                    details={value}
                    prefix={path}
                    decodedPageUrlParams={decodedPageUrlParams}
                  />
                </styled.IndentedDetails>
              ) : (
                <WorkflowHistoryEventDetailsBaseValue
                  entryKey={key}
                  entryPath={path}
                  entryValue={value}
                  renderConfig={renderConfig}
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
