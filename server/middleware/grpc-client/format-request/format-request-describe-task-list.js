const formatRequestDescribeTaskList = ({ taskListType, ...payload }) => ({
  ...payload,
  taskListType: typeof taskListType === 'string'
    ? `TASK_LIST_TYPE_${taskListType.toUpperCase()}`
    : 'TASK_LIST_TYPE_INVALID',
});

module.exports = formatRequestDescribeTaskList;
