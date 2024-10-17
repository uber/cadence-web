import {
  type WorkflowHistoryEventDetailsGroupEntry,
  type WorkflowHistoryEventDetailsEntry,
} from '../../workflow-history-event-details/workflow-history-event-details.types';

export default function getDetailsFieldLabel(
  entry:
    | WorkflowHistoryEventDetailsEntry
    | WorkflowHistoryEventDetailsGroupEntry
) {
  const mainLabel = entry.renderConfig?.getLabel
    ? entry.renderConfig.getLabel({
        key: entry.key,
        path: entry.path,
        value: entry.isGroup ? undefined : entry.value,
      })
    : entry.label;

  const groupSuffix = entry.isGroup
    ? ' ' + `(${entry.groupEntries.length})`
    : '';

  return mainLabel + groupSuffix;
}
