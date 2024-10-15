import isObjectLike from 'lodash/isObjectLike';

import getHistoryEventFieldRenderConfig from './get-history-event-field-render-config';

export default function getGroupedHistoryEventDetails({
  details,
  prefix = '',
}: {
  details: object;
  prefix?: string;
}): object {
  if (details === null || details === undefined) {
    return {};
  }

  let result = Object.create({});

  Object.entries(details).forEach(([key, value]: [string, any]) => {
    const path = prefix ? `${prefix}.${key}` : key;

    const renderConfig = getHistoryEventFieldRenderConfig({
      key,
      path,
      value,
    });

    if (renderConfig?.hide?.({ key, path, value })) {
      return;
    }

    if (isObjectLike(value) && !renderConfig?.valueComponent) {
      const entries = Object.entries(value);

      if (entries.length === 1) {
        const [childKey, childValue] = entries[0];
        result = {
          ...result,
          ...getGroupedHistoryEventDetails({
            details: {
              [`${path}.${childKey}`]: childValue,
            },
            prefix: prefix,
          }),
        };
      } else {
        result[path] = {};
        entries.forEach(([childKey, childValue]) => {
          if (isObjectLike(childValue)) {
            Object.assign(
              result[path],
              getGroupedHistoryEventDetails({
                details: { [childKey]: childValue },
                prefix: prefix,
              })
            );
          } else {
            result[path][childKey] = childValue;
          }
        });
      }
    } else {
      result[path] = value;
    }
  });

  return result;
}
