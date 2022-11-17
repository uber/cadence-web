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

export const CYTOSCAPE_LAYOUT_DEFAULTS = {
  // Horizontal `x` offset between same level nodes
  levelStep: 300,

  // Offset between primary chronological layers
  timeStep: 90,

  // Offset between primary and secondary chronological layers (having the same timestamps)
  secondaryTimeStep: 65,
};
export const CYTOSCAPE_LAYOUT_NAME = 'cadence';
export const CYTOSCAPE_GRAPH_STYLES = [
  {
    selector: 'node',
    style: {
      height: 'label',
      width: 'label',
      padding: '10px',
      'font-weight': '200',
      'font-family': 'Avenir, Helvetica, Arial, sans-serif',
      'background-color': 'white',
      'border-radius': 5,
      'min-zoomed-font-size': 8,
      shape: 'round-rectangle',
      'border-color': '#d1d1d1',
      'border-width': 1.2,
      label: 'data(name)',
      'text-valign': 'center',
      'text-halign': 'center',
    },
  },
  {
    selector: "node[status = 'completed']",
    style: {
      'border-color': '#26bd77',
      'border-width': 1,
      'background-color': '#dcffe6',
    },
  },
  {
    selector: "node[status = 'failed']",
    style: {
      'border-color': '#ff6c6c',
      'border-width': 1,
      'background-color': '#ffcccc',
    },
  },
  {
    selector: 'node:selected',
    style: { 'border-color': '#11939A', 'border-width': 2 },
  },
  {
    selector: "node[status = 'failed']:selected",
    style: { 'border-color': '#ff6c6c', 'border-width': 2.5 },
  },
  {
    selector: "node[status = 'completed']:selected",
    style: { 'border-color': '#26bd77', 'border-width': 2.5 },
  },
  {
    selector: 'edge',
    style: {
      'border-color': '#26bd77',
      'border-width': 2.5,
      'target-arrow-shape': 'triangle',
      'target-arrow-color': '#2c3e50',
      'line-color': '#2c3e50',
      width: 1.5,
      'curve-style': 'bezier', //'hay-stack' <- set to improve perfomance
    },
  },
  {
    selector: "edge[type = 'inferred']",
    style: {
      'target-arrow-color': '#ECAB20',
      'line-color': '#ECAB20',
    },
  },
  {
    selector: "edge[type = 'chronological']",
    style: {
      'target-arrow-color': '#5879DA',
      'line-color': '#5879DA',
    },
  },
];
export const CYTOSCAPE_DEFAULT_OPTIONS = {
  autoungrabify: true,
  headless: true,
  hideEdgesOnViewport: true,
  layout: {
    name: CYTOSCAPE_LAYOUT_NAME,
  },
  style: CYTOSCAPE_GRAPH_STYLES,
  styleEnabled: true,

  // NOTE: Uncomment the two lines below for better performance
  // textureOnViewport: true,
  // pixelRatio: 1,
};

export const GRAPH_SLICE_SIZE = 300;
export const GRAPH_SLICE_DELTA_MAX = GRAPH_SLICE_SIZE * 0.3;
export const GRAPH_SHOW_DELAY = 400;
export const GRAPH_ZOOM_DEFAULT = 1.1;
export const GRAPH_ZOOM_MAX = 10;
export const GRAPH_ZOOM_MIN = 0.1;

export const LEGEND_CONNECTION_LIST = [
  {
    name: 'direct',
    text:
      'Represents direct connections, when a child has the id of the parent',
  },
  { name: 'chron', text: 'Represents chronological connections' },
  {
    name: 'inferred',
    text: 'Represents connections between a signal and its triggered child ',
  },
];
