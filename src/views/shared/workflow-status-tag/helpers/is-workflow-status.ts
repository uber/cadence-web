import { type WorkflowStatus } from '../workflow-status-tag.types';
import { WORKFLOW_STATUS_NAMES } from '../workflow-status-tag.constants';

export default function isWorkflowStatus(key: any): key is WorkflowStatus {
  return key in WORKFLOW_STATUS_NAMES;
}
