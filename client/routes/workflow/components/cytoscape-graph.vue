<template>
  <div id="cytoscape">
    <!--     <Legend /> -->
    <div ref="cyt" id="cyt"></div>
  </div>
</template>

<script>
import dagre from "cytoscape-dagre";
import { getEventInfo } from "../helpers/event-function-map";
import { getEventInfo2 } from "../helpers/get-event-info";
import graphStyles from "../helpers/graph-styles";
import store from "../../../store/index";
import cytoscape from "cytoscape";
/* import Legend from "@/components/Legend.vue"; */

cytoscape.use(dagre);

export default {
  name: "cytoscape-graph",
  components: {
    /*     Legend */
  },
  props: ["workflow", "events"],
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
      }
    },
    selectedEvent(id) {
      this.zoomToNode(id);
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
    zoomToNode(id) {
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
      store.commit("displayNodeInformation", node.data().clickInfo);

      //Pan the graph to view node
      cy.animate({
        zoom: 1.1,
        pan: pan
      });
    },
    async buildTree() {
      this.events.forEach(event => {
        let {
          clickInfo,
          parentWorkflowExecution,
          status,
          childRoute
        } = getEventInfo2(event, this.events);

        if (!clickInfo) {
          clickInfo = { todo: "Todo" };
        }

        //We are viewing a child workflow, show parent btn
        if (parentWorkflowExecution) {
          store.commit("parentRoute", parentWorkflowExecution);
        }

        this.nodes.push({
          data: {
            id: event.eventId,
            name: event.eventType,
            childRoute: childRoute,
            clickInfo: clickInfo,
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
        { parent, inferredChild } = getEventInfo2(node, this.events);
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
        { chronologicalChild } = getEventInfo2(node, this.events);
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
      let container = this.$refs.cyt;
      //let self = this;
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
      let self = this;
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
          self.$router.replace({
            query: { ...self.$route.query, eventId: evt.target.data().id }
          });

          //Access the node information to display on click
          let nodeData = evt.target.data();
          let clickInfo = nodeData.clickInfo;

          store.commit("displayNodeInformation", clickInfo);

          if (nodeData.childRoute) {
            store.commit("childRoute", {
              route: nodeData.childRoute,
              btnText: "Show child workflow"
            });
          } /* else if (clickInfo.newExecutionRunId) {
            store.commit("childRoute", {
              routeId: clickInfo.newExecutionRunId,
              btnText: "Show next execution"
            });
          } */ else {
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
      let container = document.getElementById("cyt");
      cy.mount(container);
    }
  },
  computed: {
    selectedEvent() {
      return this.$route.query.eventId;
    }
  },
  mounted() {
    //this.chunkWorkflow();
    this.buildTree();
    this.viewInit().then(cy => {
      this.mountGraph(cy);
    });

    if (this.$route.query.eventId !== undefined)
      this.zoomToNode(this.$route.query.eventId);
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
#cyt {
  width: 100%;
  height: 100%;
}
</style>