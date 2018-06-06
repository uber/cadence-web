import shortName from '../../short-name'

export default function (wfStartDetails) {
	if (wfStartDetails && wfStartDetails.parentWorkflowExecution) {
		return {
			to: {
				name: 'execution/summary',
				params: {
					domain: wfStartDetails.parentWorkflowDomain,
					workflowId: wfStartDetails.parentWorkflowExecution.workflowId,
					runId: wfStartDetails.parentWorkflowExecution.runId
				}
			},
			text: `${shortName(wfStartDetails.workflowType.name)} - ${wfStartDetails.parentWorkflowExecution.workflowId}`
		}
	}
}