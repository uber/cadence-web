import getEventConnections from './get-event-connections';

const setChronologicalChildren = ({
  edges,
  eventIds,
  events,
  node,
}) => {
  const { eventId } = node;
  const { chronologicalChild } = getEventConnections(node, events);

  if (chronologicalChild && eventIds[chronologicalChild]) {
    edges.push({
      group: 'edges',
      data: {
        source: eventId,
        target: chronologicalChild,
        type: 'chronological',
      },
    });
  }
};

export default setChronologicalChildren;
