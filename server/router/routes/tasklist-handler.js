const tasklistHandler = async (ctx) => {
  const { domain, taskListName } = ctx.params;
  const descTaskList = async taskListType =>
    await ctx.cadence.describeTaskList({
      domain,
      taskList: { name: taskListName },
      taskListType,
    });

  const activityList = await descTaskList('Activity');
  const decisionList = await descTaskList('Decision');
  const activityPollerList = activityList.pollers || [];
  const decisionPollerList = decisionList.pollers || [];

  const taskList = { pollers: [...activityPollerList, ...decisionPollerList] };

  ctx.body = taskList;
};

module.exports = tasklistHandler;
