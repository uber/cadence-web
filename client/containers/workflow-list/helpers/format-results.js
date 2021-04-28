import { getDatetimeFormattedString } from '~helpers';

const formatResults = ({ dateFormat, results, timeFormat, timezone }) => {
  return results.map(result => ({
    workflowId: result.execution.workflowId,
    runId: result.execution.runId,
    uniqueId: `${result.execution.runId}-${result.closeStatus || 'OPEN'}`,
    workflowName: result.type.name,
    startTime: getDatetimeFormattedString({
      date: result.startTime,
      dateFormat,
      timeFormat,
      timezone,
    }),
    endTime: result.closeTime
      ? getDatetimeFormattedString({
        date: result.closeTime,
        dateFormat,
        timeFormat,
        timezone,
      })
      : '',
    status: (result.closeStatus || 'open').toLowerCase(),
  }));
};

export default formatResults;
