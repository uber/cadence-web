const formatHistoryEventType = ({ attributes }) => `${attributes[0].toUpperCase()}${attributes.slice(1)}`.replace('EventAttributes', '');

module.exports = formatHistoryEventType;
