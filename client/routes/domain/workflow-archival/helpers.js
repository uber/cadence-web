import get from 'lodash-es/get';
import moment from 'moment';

export const getDomain = domainSettings =>
  get(domainSettings, 'domainInfo.name', '');

export const getHistoryArchivalStatus = domainSettings =>
  get(domainSettings, 'configuration.historyArchivalStatus', '');

export const getQueryParams = ({
  endTime,
  workflowName,
  statusName,
  startTime,
  workflowId,
}) => {
  if (!startTime || !endTime) {
    return null;
  }

  const includeStatus = statusName !== 'CLOSED';

  return {
    endTime,
    startTime,
    ...(includeStatus && { status: statusName }),
    ...(workflowId && { workflowId }),
    ...(workflowName && { workflowName }),
  };
};

export const getRange = ({ endTime, range = 'last-30-days', startTime }) => {
  if (startTime && endTime) {
    return {
      endTime: moment(endTime),
      startTime: moment(startTime),
    };
  }

  return range;
};

export const getStatus = ({ statusList, statusValue }) => {
  return !statusValue
    ? statusList[0]
    : statusList.find(({ value }) => value === statusValue);
};

export const getStatusName = ({ status, statusList }) =>
  status ? status.value : statusList[0].value;

export const getVisibilityArchivalStatus = domainSettings =>
  get(domainSettings, 'configuration.visibilityArchivalStatus', '');

export const isHistoryArchivalEnabled = domainSettings =>
  getHistoryArchivalStatus(domainSettings) === 'ENABLED';

export const isVisibilityArchivalEnabled = domainSettings =>
  getVisibilityArchivalStatus(domainSettings) === 'ENABLED';

export const isArchivalEnabled = domainSettings =>
  isHistoryArchivalEnabled(domainSettings) &&
  isVisibilityArchivalEnabled(domainSettings);

export const mapArchivedWorkflowResponse = ({ executions, nextPageToken }) => ({
  results: !executions
    ? []
    : executions.map(
        ({
          closeStatus,
          closeTime,
          execution: { runId, workflowId },
          startTime,
          type: { name },
        }) => ({
          workflowId,
          runId,
          workflowName: name,
          closeStatus,
          startTime: moment(startTime).format('lll'),
          closeTime: moment(closeTime).format('lll'),
        })
      ),
  nextPageToken,
});

export const replaceDomain = (message, domainSettings) =>
  message.replace(/\{domain\}/, getDomain(domainSettings));

export const updateQueryFromRange = (query, updatedRange) => {
  const { endTime, startTime, range, ...updatedQuery } = query;

  if (typeof updatedRange === 'string') {
    updatedQuery.range = updatedRange;
  } else if (
    typeof updatedRange === 'object' &&
    updatedRange.endTime &&
    updatedRange.startTime
  ) {
    updatedQuery.endTime = updatedRange.endTime.toISOString();
    updatedQuery.startTime = updatedRange.startTime.toISOString();
  }

  return updatedQuery;
};
