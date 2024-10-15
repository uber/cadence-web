import { isObjectLike } from 'lodash';

import { type WorkflowHistoryEventDetailsValueComponentProps } from '../workflow-history-event-details/workflow-history-event-details.types';

export default function WorkflowHistoryEventDetailsField(
  props: WorkflowHistoryEventDetailsValueComponentProps
) {
  if (!isObjectLike(props.entryValue)) {
    return String(props.entryValue);
  }
  return <div>{JSON.stringify(props.entryValue)}</div>;
}
