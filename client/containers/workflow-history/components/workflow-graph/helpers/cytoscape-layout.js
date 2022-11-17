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

import { CYTOSCAPE_LAYOUT_DEFAULTS, CYTOSCAPE_LAYOUT_NAME } from '../constants';
import arrangeGraph from './arrange-graph';

class CytoscapeLayout {
  constructor(options) {
    this.options = {
      ...CYTOSCAPE_LAYOUT_DEFAULTS,
      ...options,
    };
  }

  run() {
    const options = this.options;
    const eles = options.eles;
    const nodes = eles
      .nodes()
      .sort((n1, n2) => n1.data().timestamp - n2.data().timestamp);
    const edges = eles.edges();

    arrangeGraph({ nodes, edges }, options);

    nodes.layoutPositions(this, options, ele => {
      return ele.scratch(CYTOSCAPE_LAYOUT_NAME).position;
    });
  }
}

export default function(cytoscape) {
  if (!cytoscape) {
    return;
  }

  cytoscape('layout', 'cadence', CytoscapeLayout);
}
