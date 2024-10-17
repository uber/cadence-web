import isObjectLike from 'lodash/isObjectLike';

import {
  type WorkflowHistoryEventDetailsGroupEntry,
  type WorkflowHistoryEventDetailsEntry,
} from '../workflow-history-event-details.types';

import getHistoryEventFieldRenderConfig from './get-history-event-field-render-config';

function flatten<E extends object>(
  prefix: string,
  objValue: any,
  event: E,
  result: WorkflowHistoryEventDetailsEntry[]
) {
  Object.entries(objValue).forEach(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;

    const renderConfig = getHistoryEventFieldRenderConfig({
      key,
      path,
      value,
    });

    if (renderConfig?.hide && renderConfig.hide({ key, path, value })) {
      return;
    }

    if (!renderConfig?.valueComponent && isObjectLike(value)) {
      // handle single-entry objects

      // else create a group here, this group's entries would be the flattened child object
      const groupEntry: WorkflowHistoryEventDetailsGroupEntry = {
        key,
        path,
        group: [],
      };

      const group = flatten(path, value, event, result);

      return;
    }

    result.push({ key, path, value, renderConfig });
  });
}

export default function generateHistoryEventDetails<E extends object>(
  event: E
) {
  const result: WorkflowHistoryEventDetailsEntry[] = [];
  flatten<E>('', event || {}, event, result);
  return result;
}
