import { type Props } from './workflow-history-event-details-base-value.types';

export default function WorkflowHistoryEventDetailsBaseValue({
  entryKey,
  entryPath,
  entryValue,
  renderConfig,
  ...decodedPageUrlParams
}: Props) {
  const ValueComponent = renderConfig?.valueComponent;

  if (ValueComponent !== undefined) {
    return (
      <ValueComponent
        entryKey={entryKey}
        entryPath={entryPath}
        entryValue={entryValue}
        {...decodedPageUrlParams}
      />
    );
  }

  return String(entryValue);
}
