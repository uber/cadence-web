// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { findIndex } from 'lodash-es';
import { GRAPH_SLICE_DELTA_MAX, GRAPH_SLICE_SIZE } from '../constants';
import getEventConnections from './get-event-connections';
import setChronologicalChildren from './set-chronological-children';
import setDirectAndInferredChildren from './set-direct-and-inferred-children';

/**
 * Build a graph around the `node`
 */
const selectNode = ({
  events,
  selectedEventId = null,
  sliceIndices = null,
}) => {
  // TODO: Improve chrono edge calculations for large workflows
  const enableChronologicalEdges = events && events.length < 100;

  // If the selected node index is within (GRAPH_SLICE_SIZE * 100)% of the middle of rendered slice,
  // we do not need to redraw the graph, just scroll to the node.
  const eventIds = {};
  const nodes = [];
  const edges = [];
  const results = {
    sliceIndices,
    shouldRedraw: false,
    previousExecutionRoute: null,
    parentWorkflowExecution: null,
    elements: [],
  };

  if (!events || !events.length) {
    return results;
  }

  const index =
    selectedEventId !== null && selectedEventId !== undefined
      ? findIndex(
          events,
          ({ eventId }) => String(eventId) === String(selectedEventId)
        )
      : -1;

  if (sliceIndices) {
    // No need to redraw if selected node is in the middle of rendered slice
    const { from, to } = sliceIndices;
    const center = (to + from) / 2;
    const threshold = {
      from: from === 0 ? 0 : Math.floor(center - GRAPH_SLICE_DELTA_MAX),
      to:
        to >= events.length - 1
          ? events.length
          : Math.floor(center + GRAPH_SLICE_DELTA_MAX),
    };

    if (index >= 0 && index >= threshold.from && index <= threshold.to) {
      return results;
    }
  }

  results.shouldRedraw = true;

  const from = Math.floor(Math.max(0, index - GRAPH_SLICE_SIZE / 2));
  const to = Math.min(events.length, from + GRAPH_SLICE_SIZE);
  const sliceEvents = events.slice(from, to);

  results.sliceIndices = { from, to };
  const parentArray = [];

  sliceEvents.forEach(event => {
    eventIds[event.eventId] = true;
    const {
      parentWorkflowExecution,
      previousExecutionRunId,
      newExecutionRunId,
      status,
      childRoute,
    } = getEventConnections(event, sliceEvents);

    if (previousExecutionRunId) {
      results.previousExecutionRunId = previousExecutionRunId;
    } else if (parentWorkflowExecution) {
      results.parentWorkflowExecution = parentWorkflowExecution;
    }

    nodes.push({
      group: 'nodes',
      data: {
        id: event.eventId,
        name: event.eventType,
        childRoute: childRoute,
        newExecutionRunId: newExecutionRunId,
        status: status,
        timestamp: event.timestamp.valueOf(),
      },
    });
  });

  // Set the direct and inferred relationships
  sliceEvents.forEach(node => {
    setDirectAndInferredChildren({
      edges,
      eventIds,
      events,
      node,
      parentArray,
    });
  });

  // Set the chronological relationships.
  // If the node is not referred to as a parent it should be connected back to the graph with a chron child
  if (enableChronologicalEdges) {
    sliceEvents.forEach(node => {
      if (!parentArray.includes(node.eventId)) {
        setChronologicalChildren({
          edges,
          eventIds,
          events,
          node,
        });
      }
    });
  }

  results.elements = [...nodes, ...edges];

  return results;
};

export default selectNode;
