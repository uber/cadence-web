<script>
// Copyright (c) 2021 Uber Technologies Inc.
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

import cytoscape from 'cytoscape';
import omit from 'lodash-es/omit';
import { mapMutations } from 'vuex';
import Graph from '../helpers/graph';
import cytoscapeLayout, { LAYOUT_NAME } from '../helpers/cytoscape-layout';
import graphStyles from '../helpers/graph-styles';
import store from '../../../store/index';

cytoscape.use(cytoscapeLayout);

export default {
  name: 'cytoscape-graph',
  props: ['events', 'selectedEventId'],
  data() {
    return {
      nodes: [],
      edges: [],
      styles: graphStyles,
    };
  },
  watch: {
    selectedEventId(id) {
      this.selectNode(id);
    },
    events(events) {
      this.graph.setEvents(events);
    },
  },
  methods: {
    ...mapMutations(['childRoute', 'toggleChildBtn']),
    zoomToNode(node) {
      const zoom = 1.1,
        bb = node.boundingBox(),
        w = this.cy.width(),
        h = this.cy.height(),
        pan = {
          x: (w - zoom * (bb.x1 + bb.x2)) / 2,
          y: (h - zoom * (bb.y1 + bb.y2)) / 2,
        };

      // Pan the graph to view node
      this.cy.animate({
        zoom,
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
        autoungrabify: true,
        container: container,
        elements,
        headless: true,
        hideEdgesOnViewport: true,
        layout: {
          name: LAYOUT_NAME,
        },
        style: graphStyles,
        styleEnabled: true,

        // NOTE: Uncomment the two lines below for better performance
        // textureOnViewport: true,
        // pixelRatio: 1,
      });

      cy.minZoom(0.1);
      cy.maxZoom(10);

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
            store.commit('toggleChildBtn');
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
      } = this.graph.selectNode(id);

      if (!shouldRedraw) {
        return;
      }

      // We are viewing a child workflow, show parent btn
      if (previousExecutionRunId) {
        store.commit('previousExecutionRoute', previousExecutionRunId);
      }
      else if (parentWorkflowExecution) {
        store.commit('parentRoute', parentWorkflowExecution);
      }

      this.initView(elements);
    },
  },
  mounted() {
    this.graph = new Graph(this.events);
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
