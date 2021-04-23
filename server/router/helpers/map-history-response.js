const replacer = require('./replacer');

const mapHistoryResponse = history => {
  if (Array.isArray(history && history.events)) {
    return history.events.map(e => {
      const attr = e.eventType
        ? e.eventType.charAt(0).toLowerCase() +
          e.eventType.slice(1) +
          'EventAttributes'
        : '';

      const details = e[attr] && JSON.parse(JSON.stringify(e[attr]), replacer);

      return {
        timestamp: e.timestamp,
        eventType: e.eventType,
        eventId: e.eventId,
        details,
      };
    });
  }
};

module.exports = mapHistoryResponse;
