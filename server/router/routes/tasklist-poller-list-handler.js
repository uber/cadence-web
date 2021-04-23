const tasklistPollerListHandler = async function (
  ctx
) {
  const descTaskList = async taskListType =>
    (
      await ctx.cadence.describeTaskList({
        domain: ctx.params.domain,
        taskList: { name: ctx.params.taskList },
        taskListType,
      })
    ).pollers || [];

  const r = type => (o, poller) => {
    const i = o[poller.identity] || {};

    o[poller.identity] = {
      lastAccessTime:
        !i.lastAccessTime || i.lastAccessTime < poller.lastAccessTime
          ? poller.lastAccessTime
          : i.lastAccessTime,
      taskListTypes: i.taskListTypes ? i.taskListTypes.concat([type]) : [type],
    };

    return o;
  };

  const activityL = await descTaskList('Activity'),
    decisionL = await descTaskList('Decision');

  ctx.body = activityL.reduce(
    r('activity'),
    decisionL.reduce(r('decision'), {})
  );
};

module.exports = tasklistPollerListHandler;
