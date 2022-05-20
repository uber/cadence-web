const formatRequestGetHistory = ({ HistoryEventFilterType, ...payload }) => ({
  ...payload,
  ...(HistoryEventFilterType && {
    historyEventFilterType: `EVENT_FILTER_TYPE_${HistoryEventFilterType}`,
  }),
});

module.exports = formatRequestGetHistory;
