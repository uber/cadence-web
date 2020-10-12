<template>
  <div id="cytoscape">
    <!--     <Legend /> -->
    {{ selectedNode }}
    <!--   Last node in view: {{lastNodeInView }},
    Last node rendered: {{ lastNodeRendered}}-->
    <br />
    <!--   <button v-on:click="addNode">Add node test</button> -->
    <div ref="cy" id="cy"></div>
  </div>
</template>

<script>
import dagre from "cytoscape-dagre";
import { getEventInfo } from "../helpers/event-function-map.ts";
import graphStyles from "../helpers/graph-styles";
import store from "../store/store";
import cytoscape from "cytoscape";
/* import Legend from "@/components/Legend.vue"; */
import workflow from "./data.json";

cytoscape.use(dagre);

export default {
  name: "Cytoscape",
  components: {
    Legend
  },
  /*  props: {
    workflow: {
      type: Array,
      required: true
    }
  }, */
  data() {
    return {
      nodes: [],
      edges: [],
      styles: graphStyles,
      lastNodeInView: "",
      lastNodeRendered: "",
      slicedWorkflow: null,
      workflowChunk: 0,
      parentArray: []
    };
  },
  watch: {
    lastNodeInView() {
      //Function for enabling rendering on panning - TODO
      if (this.lastNodeRendered - 100 < this.lastNodeInView) {
        console.log("close to edge");
      }
    },
    selectedNode(id) {
      //Deselect all previously selected nodes
      cy.$(":selected").deselect();

      let node = cy.elements("node#" + id),
        zoom = 1.1,
        bb = node.boundingBox(),
        w = cy.width(),
        h = cy.height(),
        pan = {
          x: (w - zoom * (bb.x1 + bb.x2)) / 2,
          y: (h - zoom * (bb.y1 + bb.y2)) / 2
        };

      //Mark current node as selected - display its informatiom
      node.select();
      store.commit("displayNodeInformation", node.data().nodeInfo);

      //Pan the graph to view node
      cy.animate({
        zoom: 1.1,
        pan: pan
      });
    }
  },
  methods: {
    //  TODO: Function which will be used to divide the workflow in chunks to be rendered
    chunkWorkflow() {
      let chunkSize = 300;
      let groups = this.workflow
        .map((e, i) => {
          return i % chunkSize === 0
            ? this.workflow.slice(i, i + chunkSize)
            : null;
        })
        .filter(e => {
          return e;
        });
      this.slicedWorkflow = groups[this.workflowChunk];
      this.lastNodeRendered = this.slicedWorkflow[
        this.slicedWorkflow.length - 1
      ].eventId;
    },
    async buildTree() {
      workflow.forEach(event => {
        let { clickInfo, childRunId, parentWorkflow, status } = getEventInfo(
          event,
          workflow
        );

        if (!clickInfo) {
          clickInfo = { todo: "Todo" };
        }

        //We have a child workflow, show parent btn
        if (parentWorkflow) {
          store.commit("parentRoute", parentWorkflow.runId);
        }
        this.nodes.push({
          data: {
            id: event.eventId,
            name: event.eventType,
            nodeInfo: clickInfo,
            status: status
          }
        });
      });
      //Set the direct and inferred relationships
      workflow.forEach(node => {
        this.setDirectAndInferred(node);
      });

      //Set the chronological relationships.
      //If the node is not referred to as a parent it should be connected back to the graph with a chron child
      workflow.forEach(node => {
        if (!this.parentArray.includes(node.eventId)) {
          this.setChron(node);
        }
      });
    },
    setDirectAndInferred(node) {
      let nodeId = node.eventId,
        { parent, inferredChild } = getEventInfo(node, workflow);
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
        { chronologicalChild } = getEventInfo(node, workflow);
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
    //Function to test adding node
    addNode() {
      let dagreLayout = {
        name: "dagre"
      };
      window.cy.add({
        group: "nodes",
        data: { id: 4670, name: "test" }
      });
      window.cy.add({
        group: "edges",
        data: { id: "y", source: 4669, target: 4670 }
      });
      window.cy.layout(dagreLayout).run();
    },
    async viewInit() {
      let self = this;
      let cy = (window.cy = cytoscape({
        autoungrabify: true,
        styleEnabled: true,
        container: document.getElementById("cy"),
        headless: true,
        hideEdgesOnViewport: true,
        //Uncomment the two lines below for better performance
        //textureOnViewport: true,
        //pixelRatio: 1,
        style: this.styles,
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
      let container = this.$refs.cy;
      cy.on("mouseover", "node", function(e) {
        container.style.cursor = "pointer";
      });
      cy.on("mouseout", "node", function(e) {
        container.style.cursor = "default";
      });

      //Register click event
      cy.on("tap", function(evt) {
        // target holds a reference to the originator
        // of the event (core or element)
        let evtTarget = evt.target;

        //Tap on background
        if (evtTarget === cy) {
          store.commit("displayNodeInformation", {});
          //Tap on a node
        } else if (evtTarget.isNode()) {
          //Access the node information to display on click
          let nodeInfo = evt.target.data().nodeInfo;

          store.commit("displayNodeInformation", nodeInfo);

          if (nodeInfo.childRunId) {
            store.commit("childRoute", {
              routeId: nodeInfo.childRunId,
              btnText: "Show child workflow"
            });
          } else if (nodeInfo.newExecutionRunId) {
            store.commit("childRoute", {
              routeId: nodeInfo.newExecutionRunId,
              btnText: "Show next execution"
            });
          } else {
            store.commit("toggleChildBtn");
          }
        }
      });

      return cy;
    },
    mountGraph(cy) {
      //Get root node
      var pos = cy.nodes("[id = " + 1 + "]").position();
      cy.center();
      cy.zoom({
        // Zoom to the specified position of root node
        level: 1,
        position: pos
      });

      let self = this;
      cy.on("pan", function(evt) {
        let ext = cy.extent();
        let nodesInView = cy.nodes().filter(n => {
          let bb = n.position();
          return (
            bb.x > ext.x1 && bb.x < ext.x2 && bb.y > ext.y1 && bb.y < ext.y2
          );
        });
        if (nodesInView.length != 0) {
          let amountNodesInView = nodesInView.length;
          self.lastNodeInView = nodesInView[amountNodesInView - 1].id();
        }
      });

      const t2 = performance.now();
      let container = document.getElementById("cy");
      cy.mount(container);
      const t3 = performance.now();
      console.log(`Call to graph mount took ${t3 - t2} milliseconds.`);
    }
  },
  computed: {
    selectedNode() {
      return this.$store.getters.selectedNode;
    }
  },
  mounted() {
    // this.chunkWorkflow();
    this.buildTree().then(() => {
      //Set the current nodes which are rendered of the graph in the store
      store.commit("setRenderedNodes", this.nodes);
    });
    const t0 = performance.now();
    this.viewInit().then(cy => {
      const t1 = performance.now();
      console.log(`Call to view_init took ${t1 - t0} milliseconds.`);
      this.mountGraph(cy);
    });
  }
};
</script>
<style scoped>
button {
  width: 100px;
  height: 20px;
}
#cytoscape {
  width: 100%;
  height: 100%;
}
#cy {
  width: 100%;
  height: 100%;
  text-align: left;
}
</style>