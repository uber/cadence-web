const TASK_LIST_TYPE_MAP = {
  Activity: 'TASK_LIST_TYPE_ACTIVITY',
  Decision: 'TASK_LIST_TYPE_DECISION',
};

const formatRequestDescribeTaskList = ({ taskListType, ...payload }) => ({
  ...payload,
  taskListType: TASK_LIST_TYPE_MAP[taskListType] ?? 'TASK_LIST_TYPE_INVALID',
});

module.exports = formatRequestDescribeTaskList;