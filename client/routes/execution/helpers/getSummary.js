import getJsonStringObject from './getJsonStringObject';
import getKeyValuePairs from './getKeyValuePairs';
import getStringElipsis from './getStringElipsis';
import getSummaryWorkflowStatus from './getSummaryWorkflowStatus';
import parentWorkflowLink from './parentWorkflowLink';

const getSummary = ({
  events,
  isWorkflowRunning,
  workflow
}) => {
  const formattedWorkflow = Object.assign({}, workflow, {
    pendingActivities: workflow.pendingActivities.map((pendingActivity) => {
      return Object.assign({}, pendingActivity, {
        kvps: getKeyValuePairs(pendingActivity),
      });
    }),
  });

  if (!events || !events.length) {
    return {
      input: undefined,
      isWorkflowRunning,
      parentWorkflowRoute: undefined,
      result: undefined,
      wfStatus: undefined,
      workflow: formattedWorkflow,
    };
  }

  const firstEvent = events[0];
  const lastEvent = events.length > 1 && events[events.length - 1];

  const input = getJsonStringObject(firstEvent.details.input);

  const workflowCompletedEvent = lastEvent && lastEvent.eventType.startsWith('WorkflowExecution')
    ? lastEvent
    : undefined;

  const result = !!workflowCompletedEvent
    ? getJsonStringObject(workflowCompletedEvent.details.result || workflowCompletedEvent.details)
    : undefined;

  const wfStatus = getSummaryWorkflowStatus({
    isWorkflowRunning,
    workflow,
    workflowCompletedEvent
  });

  const parentWorkflowRoute = parentWorkflowLink(firstEvent.details);

  return {
    input,
    isWorkflowRunning,
    parentWorkflowRoute,
    result,
    wfStatus,
    workflow: formattedWorkflow,
  };
};

export default getSummary;