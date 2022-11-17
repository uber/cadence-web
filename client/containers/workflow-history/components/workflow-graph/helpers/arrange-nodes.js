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

import { CYTOSCAPE_LAYOUT_NAME } from '../constants';

/**
 * Traverse the graph recursively and set `level` and `parentTimeIndexOffset` for all nodes
 * @method arrangeNodes
 * @param {object} options
 * @param {object} options.idToChildren - node id to child lookup hash
 * @param {object} options.level - horizontal offset of the tree-like graph node arranged to avoid overlapping.
 * @param {object} options.nodes
 * @param {object} options.parentTimeIndex
 * @param {object} options.parentTimeIndexOffset - secondary time coordinate:
 *    there are two connected nodes: A -----> B
 *    A.data.timeIndex === B.data.timeIndex
 *  then we set
 *    A.data.timeIndexSecondary = 0
 *    B.data.timeIndexSecondary = 1
 *  To display B node beflow the A node whilst they they have the same timestamp
 */
const arrangeNodes = ({
  idToChildren,
  level = 0,
  nodes,
  parentTimeIndex = -1,
  parentTimeIndexOffset = 0,
}) => {
  let levelOffset = level;

  nodes.forEach((node, index) => {
    levelOffset += index ? 1 : 0;
    const children = idToChildren[node.id()];
    const nodeScratch = node.scratch(CYTOSCAPE_LAYOUT_NAME);

    nodeScratch.level = levelOffset;
    nodeScratch.timeIndexSecondary =
      parentTimeIndex === nodeScratch.timeIndex ? parentTimeIndexOffset + 1 : 0;

    if (children.length) {
      const { level: newLevel } = arrangeNodes({
        idToChildren,
        level: levelOffset,
        nodes: children,
        parentTimeIndex: nodeScratch.timeIndex,
        parentTimeIndexOffset: nodeScratch.timeIndexSecondary,
      });

      levelOffset = newLevel;
    }
  });

  return {
    level: levelOffset,
  };
};

export default arrangeNodes;
