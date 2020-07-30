import { getDatetimeFormattedString } from '~helpers';

const getFormattedResults = ({ dateFormat, results, timeFormat, timezone }) => results.map(result => ({
  workflowId: result.execution.workflowId,
  runId: result.execution.runId,
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

export default getFormattedResults;
