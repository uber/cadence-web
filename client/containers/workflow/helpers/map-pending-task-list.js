import {
  PENDING_TASK_TYPE_TO_ID_MAP,
  PENDING_TASK_TYPE_TO_NAME_MAP,
} from '../constants';

const mapPendingTaskList = ({ pendingTaskType, pendingTaskList }) => pendingTaskList.map((pendingTask) => ({
  ...pendingTask,
  id: `${pendingTaskType}_${pendingTask[PENDING_TASK_TYPE_TO_ID_MAP[pendingTaskType]]}`,
  name: PENDING_TASK_TYPE_TO_NAME_MAP[pendingTaskType],
}));

export default mapPendingTaskList;
