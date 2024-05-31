import type Long from 'long';

import type { DomainWorkflow } from '../domain-page.types';

// TODO @adhitya.mamallan - use GRPC types here when they are ready
export default function mapExecutionsToWorkflows(
  executions: Array<any>
): Array<DomainWorkflow> {
  return executions.reduce((acc: Array<DomainWorkflow>, execution) => {
    if (!execution.execution?.runId || !execution.execution?.workflowId) {
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
      workflowID: execution.execution.workflowId,
      runID: execution.execution?.runId,
      workflowName: execution.type?.name,
      status: Boolean(workflowExecutionCloseTime)
        ? execution.closeStatus
        : 'WORKFLOW_EXECUTION_CLOSE_STATUS_INVALID',
      startTime: getTimeFromJSON(execution.startTime),
      closeTime: workflowExecutionCloseTime,
    });

    return acc;
  }, []);
}

function getTimeFromJSON(time: number | Long): number {
  if (typeof time === 'number') return time;
  return time.toNumber();
}
