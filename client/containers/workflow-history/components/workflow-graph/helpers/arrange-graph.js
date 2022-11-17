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

import { orderBy } from 'lodash-es';
import { CYTOSCAPE_LAYOUT_NAME } from '../constants';
import arrangeNodes from './arrange-nodes';
import getTimeIndexPairKey from './get-time-index-pair-key';

const arrangeGraph = ({ nodes, edges }, options) => {
  const idToNode = {};
  const idToChildren = {};
  const timeIndices = {};
  const hasParent = {};
  const rootNodes = [];

  // Iterate through nodes and set `timeIndex` and `timeIndexSecondary` for every node
  // timeIndex is an index of the node timestamp in a sorted array of all timestamps
  // Which is used to keep the chronogical order of nodes but discard the scale of time intervals
  // when drawing the graph
  nodes.forEach(node => {
    idToNode[node.id()] = node;
    idToChildren[node.id()] = [];
    const timestamp = node.data().timestamp;

    if (timeIndices[timestamp] === undefined) {
      timeIndices[timestamp] = Object.keys(timeIndices).length;
    }

    node.scratch(CYTOSCAPE_LAYOUT_NAME, {
      timeIndex: timeIndices[timestamp],
      timeIndexSecondary: 0,
    });
  });

  // Find all roots (entry points with no parents) of the graph
  for (const edge of edges) {
    idToChildren[edge.data().source].push(idToNode[edge.data().target]);
    hasParent[edge.data().target] = true;
  }

  for (const node of nodes) {
    if (!hasParent[node.id()]) {
      rootNodes.push(node);
    }
  }

  // Arrange all nodes in the graph, starting from root entry points
  arrangeNodes({ idToChildren, nodes: rootNodes });

  // Calculate `tTimes` for all (timeIndex, timeIndexSecondary) pairs
  // which are the time (Y) coordinates nodes in the graph
  let t = 0;
  let prevT1 = 0;
  let prevT2 = 0;
  const tTimes = {};
  const times = orderBy(
    nodes.map(n => ({
      t1: n.scratch(CYTOSCAPE_LAYOUT_NAME).timeIndex,
      t2: n.scratch(CYTOSCAPE_LAYOUT_NAME).timeIndexSecondary,
    })),
    ['t1', 't2']
  );

  times.forEach(({ t1, t2 }) => {
    const key = getTimeIndexPairKey(t1, t2);

    if (t1 === prevT1) {
      t += (t2 - prevT2) * options.secondaryTimeStep;
    }

    t += (t1 - prevT1) * options.timeStep;
    prevT1 = t1;
    prevT2 = t2;

    tTimes[key] = t;
  });

  // Set the `position` for all nodes using the calculated `level` and `tTimes` values
  nodes.forEach(node => {
    const nodeScratch = node.scratch(CYTOSCAPE_LAYOUT_NAME);
    const key = getTimeIndexPairKey(
      nodeScratch.timeIndex,
      nodeScratch.timeIndexSecondary
    );

    nodeScratch.position = {
      x: nodeScratch.level * options.levelStep,
      y: tTimes[key],
    };
  });
};

export default arrangeGraph;
