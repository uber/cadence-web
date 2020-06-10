import { getDatetimeFormattedString } from '~helpers';

export default ({ dateFormat, results, timeFormat, timezone }) =>
  !results
    ? []
    : results.map(
        ({
          closeStatus,
          closeTime,
          execution: { runId, workflowId },
          startTime,
          type: { name },
        }) => ({
          closeStatus,
          closeTime: getDatetimeFormattedString({
            date: closeTime,
            dateFormat,
            timeFormat,
            timezone,
          }),
          runId,
          startTime: getDatetimeFormattedString({
            date: startTime,
            dateFormat,
            timeFormat,
            timezone,
          }),
          workflowId,
          workflowName: name,
        })
      );
