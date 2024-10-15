import { type WorkflowHistoryEventDetailsEntry } from '../../workflow-history-event-details/workflow-history-event-details.types';

export default function getDetailsFieldLabel({
  entry,
  isGenericObject,
}: {
  entry: WorkflowHistoryEventDetailsEntry;
  isGenericObject: boolean;
}) {
  const label = entry.renderConfig?.getLabel
    ? entry.renderConfig.getLabel({
        key: entry.key,
        path: entry.path,
        value: entry.value,
      })
    : entry.key;

  if (isGenericObject) {
    return label + ' ' + `(${Object.entries(entry.value).length})`;
  } else {
    return label;
  }
}
