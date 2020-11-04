import { orderBy } from 'lodash-es';

const defaults = {
  levelStep: 200, // Horizontal `x` offset between same level nodes
  timeStep: 90, // Offset between primary chronological layers
  secondaryTimeStemp: 65, // Offset between primary and secondary chronological layers (having the same timestamps)
};

export const LAYOUT_NAME = 'cadence';

// Arrange graph
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
  nodes.forEach((n, index) => {
    idToNode[n.id()] = n;
    idToChildren[n.id()] = [];
    const timestamp = n.data().timestamp;

    if (timeIndices[timestamp] === undefined) {
      timeIndices[timestamp] = Object.keys(timeIndices).length;
    }

    n.scratch(LAYOUT_NAME, {
      timeIndex: timeIndices[timestamp],
      timeIndexSecondary: 0,
    });
  });

  // Find all roots (entry points with no parents) of the graph
  for (const e of edges) {
    idToChildren[e.data().source].push(idToNode[e.data().target]);
    hasParent[e.data().target] = true;
  }

  for (const n of nodes) {
    if (!hasParent[n.id()]) {
      rootNodes.push(n);
    }
  }

  // Traverse the graph recursively and set `level` and `timeIndexSecondary` for all nodes
  // Level is horizontal offset of the tree-like graph node arranged to avoid overlapping.
  // `timeIndexSecondary` is secondary time coordinate:
  //    there are two connected nodes: A -----> B
  //    A.data.timeIndex === B.data.timeIndex
  //  then we set
  //    A.data.timeIndexSecondary = 0
  //    B.data.timeIndexSecondary = 1
  //  To display B node beflow the A node whilst they they have the same timestamp
  const arrange = (
    nodes,
    level = 0,
    parentTimeIndex = -1,
    parentTimeIndexOffset = 0
  ) => {
    let l = level;

    nodes.forEach((n, i) => {
      l += i ? 1 : 0;
      const children = idToChildren[n.id()];
      const nScratch = n.scratch(LAYOUT_NAME);

      if (nScratch.level === undefined) {
        nScratch.level = l;
        nScratch.timeIndexSecondary =
          parentTimeIndex === nScratch.timeIndex
            ? parentTimeIndexOffset + 1
            : 0;

        if (children.length) {
          const { level: newLevel } = arrange(
            children,
            l,
            nScratch.timeIndex,
            nScratch.timeIndexSecondary
          );

          l = newLevel;
        }
      }
    });

    return {
      level: l,
    };
  };

  // Arrange all nodes in the graph, starting from root entry points
  arrange(rootNodes);

  // Calculate `tTimes` for all (timeIndex, timeIndexSecondary) pairs
  // which are the time (Y) coordinates nodes in the graph
  let t = 0;
  let prevT1 = 0;
  let prevT2 = 0;
  const tTimes = {};
  const times = orderBy(
    nodes.map(n => ({
      t1: n.scratch(LAYOUT_NAME).timeIndex,
      t2: n.scratch(LAYOUT_NAME).timeIndexSecondary,
    })),
    ['t1', 't2']
  );
  const makeKey = (primary, secondary) => `${primary}-${secondary}`;

  times.forEach(({ t1, t2 }) => {
    const key = makeKey(t1, t2);

    if (t1 === prevT1) {
      t += (t2 - prevT2) * options.secondaryTimeStemp;
    }

    t += (t1 - prevT1) * options.timeStep;
    prevT1 = t1;
    prevT2 = t2;

    tTimes[key] = t;
  });

  // Set the `position` for all nodes using the calculated `level` and `tTimes` values
  nodes.forEach(n => {
    const nScratch = n.scratch(LAYOUT_NAME);
    const key = makeKey(nScratch.timeIndex, nScratch.timeIndexSecondary);

    nScratch.position = {
      x: nScratch.level * options.levelStep,
      y: tTimes[key],
    };
  });
};

function CadenceLayout(options) {
  this.options = Object.assign({}, defaults, options);
}

CadenceLayout.prototype.run = function() {
  const options = this.options;
  const eles = options.eles;
  const nodes = eles.nodes();
  const edges = eles.edges();

  arrangeGraph({ nodes, edges }, options);

  nodes.layoutPositions(this, options, ele => {
    return ele.scratch(LAYOUT_NAME).position;
  });
};

export default function(cytoscape) {
  if (!cytoscape) {
    return;
  }

  cytoscape('layout', 'cadence', CadenceLayout);
}
