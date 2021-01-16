// Copyright (c) 2020-2021 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { findIndex } from 'lodash-es';
import getEventConnections from './get-event-connections';

// TODO - refactor class into components/graph.vue
class Graph {
  constructor(events = []) {
    this.setEvents(events);
  }

  setEvents(events) {
    this.events = events;
    this.sliceIndices = null;
  }

  /**
   * Build a graph around the `node`
   */
  selectNode(selectedEventId = null) {
    const N = 300;
    // TODO: Improve chrono edge calculations for large workflows
    const enableChronologicalEdges = this.events && this.events.length < 100;

    // If the selected node index is within (S * 100)% of the middle of rendered slice,
    // we do not need to redraw the graph, just scroll to the node.
    const S = 0.6;
    const eventIds = {};
    const nodes = [];
    const edges = [];
    const results = {
      shouldRedraw: false,
      previousExecutionRoute: null,
      parentWorkflowExecution: null,
      elements: [],
    };

    const { events: allEvents, sliceIndices } = this;

    if (!allEvents || !allEvents.length) {
      return results;
    }

    const index =
      selectedEventId !== null && selectedEventId !== undefined
        ? findIndex(
            allEvents,
            ({ eventId }) => String(eventId) === String(selectedEventId)
          )
        : -1;

    if (sliceIndices) {
      // No need to redraw if selected node is in the middle of rendered slice
      const { from, to } = sliceIndices;
      const center = (to + from) / 2;
      const delta = N * 0.5 * S;
      const threshold = {
        from: from === 0 ? 0 : Math.floor(center - delta),
        to:
          to >= allEvents.length - 1
            ? allEvents.length
            : Math.floor(center + delta),
      };

      if (index >= 0 && index >= threshold.from && index <= threshold.to) {
        return results;
      }
    }

    results.shouldRedraw = true;

    const from = Math.floor(Math.max(0, index - N / 2));
    const to = Math.min(allEvents.length, from + N);
    const events = allEvents.slice(from, to);

    this.sliceIndices = { from, to };
    const parentArray = [];

    const setDirectAndInferred = node => {
      const nodeId = node.eventId,
        { parent, inferredChild } = getEventConnections(node, allEvents);

      if (parent && eventIds[parent] && eventIds[nodeId]) {
        parentArray.push(parent);
        edges.push({
          group: 'edges',
          data: { source: parent, target: nodeId, type: 'direct' },
        });
      }

      if (inferredChild && eventIds[inferredChild]) {
        parentArray.push(nodeId);
        edges.push({
          group: 'edges',
          data: { source: nodeId, target: inferredChild, type: 'inferred' },
        });
      }
    };

    const setChron = node => {
      const nodeId = node.eventId,
        { chronologicalChild } = getEventConnections(node, allEvents);

      if (chronologicalChild && eventIds[chronologicalChild]) {
        edges.push({
          group: 'edges',
          data: {
            source: nodeId,
            target: chronologicalChild,
            type: 'chronological',
          },
        });
      }
    };

    events.forEach(event => {
      eventIds[event.eventId] = true;
      const {
        parentWorkflowExecution,
        previousExecutionRunId,
        newExecutionRunId,
        status,
        childRoute,
      } = getEventConnections(event, events);

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
    events.forEach(node => {
      setDirectAndInferred(node);
    });

    // Set the chronological relationships.
    // If the node is not referred to as a parent it should be connected back to the graph with a chron child
    if (enableChronologicalEdges) {
      events.forEach(node => {
        if (!parentArray.includes(node.eventId)) {
          setChron(node);
        }
      });
    }

    results.elements = [...nodes, ...edges];

    return results;
  }
}

export default Graph;
