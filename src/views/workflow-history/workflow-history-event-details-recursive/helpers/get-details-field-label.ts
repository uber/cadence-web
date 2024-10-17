import {
  type WorkflowHistoryEventDetailsGroupEntry,
  type WorkflowHistoryEventDetailsEntry,
} from '../../workflow-history-event-details/workflow-history-event-details.types';

export default function getDetailsFieldLabel(
  entry:
    | WorkflowHistoryEventDetailsEntry
    | WorkflowHistoryEventDetailsGroupEntry
) {
  return (
    (entry.renderConfig?.getLabel
      ? entry.renderConfig.getLabel({
          key: entry.key,
          path: entry.path,
          value: entry.isGroup ? undefined : entry.value,
        })
      : entry.label) +
    (entry.isGroup ? ' ' + `(${entry.groupEntries.length})` : '')
  );
}
