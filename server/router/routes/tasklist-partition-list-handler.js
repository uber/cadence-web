const tasklistPartitionListHandler = async (ctx) => {
  const { domain, taskList } = ctx.params;

  ctx.body = await ctx.cadence.listTaskListPartitions({
    domain,
    taskList: { name: taskList },
  });
};

module.exports = tasklistPartitionListHandler;
