import getEventConnections from './get-event-connections';

const setDirectAndInferredChildren = ({
  edges,
  eventIds,
  events,
  node,
  parentArray,
}) => {
  const { eventId } = node;
  const { parent, inferredChild } = getEventConnections(node, events);

  if (parent && eventIds[parent] && eventIds[eventId]) {
    parentArray.push(parent);
    edges.push({
      group: 'edges',
      data: { source: parent, target: eventId, type: 'direct' },
    });
  }

  if (inferredChild && eventIds[inferredChild]) {
    parentArray.push(eventId);
    edges.push({
      group: 'edges',
      data: { source: eventId, target: inferredChild, type: 'inferred' },
    });
  }
};

export default setDirectAndInferredChildren;
