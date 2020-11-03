<template>
  <div id="cytoscape">
    <div ref="cy" id="cy"></div>
  </div>
</template>

<script>
import dagre from "cytoscape-dagre";
import { getEventConnections } from "../helpers/get-event-connections";
import graphStyles from "../helpers/graph-styles";
import store from "../../../store/index";
import cytoscape from "cytoscape";
import omit from "lodash-es/omit";

cytoscape.use(dagre);

export default {
  name: "cytoscape-graph",
  props: ["events", "selectedEventId"],
  data() {
    return {
      nodes: [],
      edges: [],
      styles: graphStyles,
      parentArray: []
    };
  },
  watch: {
    selectedEventId(id) {
      if (id) this.selectNode(id);
    }
  },
  methods: {
    zoomToNode(node) {
      let zoom = 1.1,
        bb = node.boundingBox(),
        w = cy.width(),
        h = cy.height(),
        pan = {
          x: (w - zoom * (bb.x1 + bb.x2)) / 2,
          y: (h - zoom * (bb.y1 + bb.y2)) / 2
        };

      //Pan the graph to view node
      cy.animate({
        zoom,
        pan
      });
    },
    updateChildBtn(node) {
      let nodeData = node.data();
      if (nodeData.childRoute) {
        store.commit("childRoute", {
          route: nodeData.childRoute,
          btnText: "To child"
        });
      } else if (nodeData.newExecutionRunId) {
        store.commit("childRoute", {
          route: nodeData.newExecutionRunId,
          btnText: "Next execution"
        });
      } else {
        store.commit("toggleChildBtn");
      }
    },
    selectNode(id) {
      if (id) {
        //Deselect all previously selected nodes
        cy.$(":selected").deselect();

        //Mark current node as selected
        let node = cy.elements("node#" + id);
        node.select();

        this.updateChildBtn(node);
        this.zoomToNode(node);
      }
    },
    async buildTree() {
      this.events.forEach(event => {
        let {
          parentWorkflowExecution,
          previousExecutionRunId,
          newExecutionRunId,
          status,
          childRoute
        } = getEventConnections(event, this.events);

        //We are viewing a child workflow, show parent btn
        if (previousExecutionRunId) {
          store.commit("previousExecutionRoute", previousExecutionRunId);
        } else if (parentWorkflowExecution) {
          store.commit("parentRoute", parentWorkflowExecution);
        }

        this.nodes.push({
          data: {
            id: event.eventId,
            name: event.eventType,
            childRoute: childRoute,
            newExecutionRunId: newExecutionRunId,
            status: status
          }
        });
      });
      //Set the direct and inferred relationships
      this.events.forEach(node => {
        this.setDirectAndInferred(node);
      });

      //Set the chronological relationships.
      //If the node is not referred to as a parent it should be connected back to the graph with a chron child
      this.events.forEach(node => {
        if (!this.parentArray.includes(node.eventId)) {
          this.setChron(node);
        }
      });
    },
    setDirectAndInferred(node) {
      let nodeId = node.eventId,
        { parent, inferredChild } = getEventConnections(node, this.events);
      if (parent) {
        this.parentArray.push(parent);
        this.edges.push({
          data: { source: parent, target: nodeId, type: "direct" }
        });
      }
      if (inferredChild) {
        this.parentArray.push(nodeId);
        this.edges.push({
          data: { source: nodeId, target: inferredChild, type: "inferred" }
        });
      }
    },
    setChron(node) {
      let nodeId = node.eventId,
        { chronologicalChild } = getEventConnections(node, this.events);
      if (chronologicalChild) {
        this.edges.push({
          data: {
            source: nodeId,
            target: chronologicalChild,
            type: "chronological"
          }
        });
      }
    },
    async viewInit() {
      let container = this.$refs.cy;
      let cy = (window.cy = cytoscape({
        autoungrabify: true,
        styleEnabled: true,
        container: container,
        headless: true,
        hideEdgesOnViewport: true,
        //Uncomment the two lines below for better performance
        //textureOnViewport: true,
        //pixelRatio: 1,
        style: graphStyles,
        elements: {
          nodes: this.nodes,
          edges: this.edges
        },
        layout: {
          name: "dagre",
          nodeDimensionsIncludeLabels: true,
          spacingFactor: 1.2, // to avoid node collision
          nodeSep: 230,
          edgeSep: 100,
          rankSep: 70
        }
      }));
      cy.on("mouseover", "node", function(e) {
        container.style.cursor = "pointer";
      });
      cy.on("mouseout", "node", function(e) {
        container.style.cursor = "default";
      });

      //Register click event
      cy.on("tap", evt => {
        let evtTarget = evt.target;

        //Tap on background
        if (evtTarget === cy) {
          if (this.$route.query.eventId) {
            this.$router.replace({ query: omit(this.$route.query, "eventId") });
            store.commit("toggleChildBtn");
          }
          //Tap on a node that is not already selected
        } else if (evtTarget.isNode() && !evtTarget.selected()) {
          let nodeData = evtTarget.data();
          this.$router.replace({
            query: { ...this.$route.query, eventId: nodeData.id }
          });
        }
      });
      return cy;
    },
    mountGraph(cy) {
      //TODO: this is not finished
      var pos = cy.nodes("[id = " + 1 + "]").position();
      cy.center();
      cy.zoom({
        // Zoom to the specified position of root node
        level: 1,
        position: pos
      });
      let container = this.$refs.cy;
      cy.mount(container);
    }
  },
  mounted() {
    this.buildTree();
    this.viewInit().then(cy => {
      this.mountGraph(cy);
    });

    this.selectNode(this.selectedEventId);
  }
};
</script>
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