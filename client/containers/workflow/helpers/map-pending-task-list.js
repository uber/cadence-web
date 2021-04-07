import {
  PENDING_TASK_TYPE_TO_ID_MAP,
  PENDING_TASK_TYPE_TO_DISPLAY_MAP,
} from '../constants';
import getWorkflowLink from './get-workflow-link';

const mapPendingTaskList = ({ domain, pendingTaskType, pendingTaskList }) => pendingTaskList.map((pendingTask) => ({
  ...pendingTask,
  pendingTaskId: `${pendingTaskType}_${pendingTask[PENDING_TASK_TYPE_TO_ID_MAP[pendingTaskType]]}`,
  pendingTaskLink: getWorkflowLink({ ...pendingTask, domain }),
  pendingTaskType,
  pendingTaskTypeDisplay: PENDING_TASK_TYPE_TO_DISPLAY_MAP[pendingTaskType],
}));

export default mapPendingTaskList;
