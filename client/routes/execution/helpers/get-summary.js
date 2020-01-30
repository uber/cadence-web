import { getJsonStringObject, getKeyValuePairs } from '../../../helpers';
import getSummaryWorkflowStatus from './get-summary-workflow-status';
import parentWorkflowLink from './parent-workflow-link';

const getSummary = ({ events, isWorkflowRunning, workflow }) => {
  const formattedWorkflow = workflow.pendingActivities
    ? {
        ...workflow,
        pendingActivities: workflow.pendingActivities.map(pendingActivity => ({
          ...pendingActivity,
          kvps: getKeyValuePairs(pendingActivity),
        })),
      }
    : workflow;

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

  const workflowCompletedEvent =
    lastEvent && lastEvent.eventType.startsWith('WorkflowExecution')
      ? lastEvent
      : undefined;

  const result = workflowCompletedEvent
    ? getJsonStringObject(
        workflowCompletedEvent.details.result || workflowCompletedEvent.details
      )
    : undefined;

  const wfStatus = getSummaryWorkflowStatus({
    isWorkflowRunning,
    workflow,
    workflowCompletedEvent,
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
