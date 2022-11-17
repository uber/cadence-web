<script>
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

import cytoscape from 'cytoscape';
import omit from 'lodash-es/omit';
import { mapMutations } from 'vuex';
import { getGraphPanCenter, selectNode } from '../helpers';
import cytoscapeLayout from '../helpers/cytoscape-layout';
import {
  CYTOSCAPE_DEFAULT_OPTIONS,
  GRAPH_ZOOM_DEFAULT,
  GRAPH_ZOOM_MAX,
  GRAPH_ZOOM_MIN,
} from '../constants';

cytoscape.use(cytoscapeLayout);

export default {
  name: 'graph',
  props: ['events', 'selectedEventId'],
  watch: {
    selectedEventId(id) {
      this.selectNode(id);
    },
  },
  methods: {
    ...mapMutations(['childRoute', 'toggleChildBtn']),
    zoomToNode(node) {
      const pan = getGraphPanCenter({
        boundingBox: node.boundingBox(),
        height: this.cy.height(),
        width: this.cy.width(),
      });

      // Pan the graph to view node
      this.cy.animate({
        zoom: GRAPH_ZOOM_DEFAULT,
        pan,
      });
    },
    updateChildBtn(node) {
      const nodeData = node.data();

      if (nodeData.childRoute) {
        this.childRoute({ route: nodeData.childRoute, btnText: 'To child' });
      } else if (nodeData.newExecutionRunId) {
        this.childRoute({
          route: nodeData.newExecutionRunId,
          btnText: 'Next execution',
        });
      } else {
        this.toggleChildBtn();
      }
    },
    selectNode(id) {
      // Update graph to render nodes around the select one
      this.updateView(id);

      // Deselect all previously selected nodes
      this.cy.$(':selected').deselect();

      // Mark current node as selected
      const node =
        id !== null && id !== undefined ? this.cy.nodes('node#' + id) : null;

      if (node && node.length) {
        // Zoom to the selected node
        node.select();
        this.updateChildBtn(node);
        this.zoomToNode(node);
      }
    },
    initView(elements) {
      if (this.cy) {
        this.cy.unmount();
        this.cy.destroy();
        this.cy = null;
      }

      // Create cy instance
      const container = this.$refs.cy;
      const cy = cytoscape({
        ...CYTOSCAPE_DEFAULT_OPTIONS,
        container,
        elements,
      });

      cy.minZoom(GRAPH_ZOOM_MIN);
      cy.maxZoom(GRAPH_ZOOM_MAX);

      cy.on('mouseover', 'node', function(e) {
        container.style.cursor = 'pointer';
      });
      cy.on('mouseout', 'node', function(e) {
        container.style.cursor = 'default';
      });

      // Register click event
      cy.on('tap', ({ target: eventTarget }) => {
        // Tap on background
        if (eventTarget === cy) {
          if (this.selectedEventId) {
            this.$router.replace({ query: omit(this.$route.query, 'eventId') });
            this.$store.commit('toggleChildBtn');
          }
        }
        // Tap on a node that is not already selected
        else if (eventTarget.isNode() && !eventTarget.selected()) {
          const nodeData = eventTarget.data();

          this.$router.replace({
            query: { ...this.$route.query, eventId: nodeData.id },
          });
        }
      });
      cy.mount(container);
      this.cy = cy;
      this.cy.fit();
    },
    updateView(id = null) {
      if (this.cy && id === null) {
        // Do nothing if graph is rendered and user clicks somewhere between nodes
        return;
      }

      const {
        shouldRedraw,
        elements,
        previousExecutionRunId,
        parentWorkflowExecution,
        sliceIndices,
      } = selectNode({
        events: this.events,
        selectedEventId: id,
        sliceIndices: this.sliceIndices,
      });

      this.sliceIndices = sliceIndices;

      if (!shouldRedraw) {
        return;
      }

      // Currently viewing a child workflow, show parent button
      if (previousExecutionRunId) {
        this.$store.commit('previousExecutionRoute', previousExecutionRunId);
      } else if (parentWorkflowExecution) {
        this.$store.commit('parentRoute', parentWorkflowExecution);
      }

      this.initView(elements);
    },
  },
  mounted() {
    this.sliceIndices = null;
    this.selectNode(this.selectedEventId);
  },
};
</script>

<template>
  <div id="cytoscape">
    <div ref="cy" id="cy"></div>
  </div>
</template>

<style scoped>
#cytoscape {
  width: 100%;
  height: 100%;
}
#cy {
  width: 100%;
  height: 100%;
}
</style>
