import type { DomainWorkflow } from '../domain-page.types';

// TODO @adhitya.mamallan - use GRPC types here when they are ready
export default function mapExecutionsToWorkflows(
  executions: Array<any>
): Array<DomainWorkflow> {
  return executions.reduce((acc: Array<DomainWorkflow>, execution) => {
    console.log(JSON.stringify(execution));
    if (
      !execution.workflowExecution?.runId ||
      !execution.workflowExecution?.workflowId
    ) {
      return acc;
    }

    if (!execution.type?.name) {
      return acc;
    }

    if (!execution.startTime) {
      return acc;
    }

    const workflowExecutionCloseTime = execution.closeTime
      ? getTimeFromJSON(execution.closeTime)
      : undefined;

    acc.push({
      workflowID: execution.workflowExecution.workflowId,
      runID: execution.workflowExecution?.runId,
      workflowName: execution.type?.name,
      status: Boolean(workflowExecutionCloseTime)
        ? execution.closeStatus
        : 'WORKFLOW_EXECUTION_STATUS_RUNNING',
      startTime: getTimeFromJSON(execution.startTime),
      closeTime: workflowExecutionCloseTime,
    });

    return acc;
  }, []);
}

function getTimeFromJSON(time: { seconds: number; nanos: number }): number {
  return time.seconds * 1000 + time.nanos / 1000000;
}
