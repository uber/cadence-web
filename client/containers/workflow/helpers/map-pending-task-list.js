import {
  PENDING_TASK_TYPE_TO_ID_MAP,
  PENDING_TASK_TYPE_TO_DISPLAY_MAP,
} from '../constants';
import getWorkflowLink from './get-workflow-link';

const mapPendingTaskList = ({ domain, pendingTaskType, pendingTaskList }) => pendingTaskList.map((pendingTask) => ({
  ...pendingTask,
  id: `${pendingTaskType}_${pendingTask[PENDING_TASK_TYPE_TO_ID_MAP[pendingTaskType]]}`,
  typeDisplay: PENDING_TASK_TYPE_TO_DISPLAY_MAP[pendingTaskType],
  type: pendingTaskType,
  link: getWorkflowLink({ ...pendingTask, domain }),
}));

export default mapPendingTaskList;
