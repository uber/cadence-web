<template>
  <div class="tree-graph">
    <div class="node-list">
      <div class="section-header">
        <div class="section-header-text">Node list</div>
      </div>
      <hr class="divider" />
      <div class="list-container" v-for="node in renderedNodes" :key="node.id">
        <div class="list-item" v-on:click="selectNode(node)">
          <div class="list-item-header">{{ node.data.name }}</div>
          <div class="list-item-content">
            {{ node.data.nodeInfo.timestamp }}
          </div>
        </div>
        <hr class="divider" />
      </div>
    </div>
    <div id="canvas">
      <div class="section-header">
        <router-link class="btn" :to="{ name: 'home' }">Home</router-link>
        <div class="btn" v-on:click="route(parentRoute)" v-if="parentRoute">
          Go to parent
        </div>
        <div class="section-header-text">{{ workflowName }}</div>
      </div>
      <hr class="divider" />
      <div v-if="workflowLoading" id="loading"></div>
      <WorkflowGraph
        v-if="!workflowLoading"
        :workflow="workflow"
        :events="events"
      />
    </div>
    <div class="event-info">
      <div class="section-header">
        <div class="section-header-text">Event information</div>
      </div>
      <hr class="divider" />
      <div
        v-if="hasChildBtn"
        class="event-info-btn"
        v-on:click="route(childRouteId)"
      >
        {{ btnText }}
      </div>
      <hr v-if="hasChildBtn" class="divider" />
      <div class="list-container" v-for="(key, value) in selectedNodeInfo">
        <div class="list-item">
          <div class="list-item-header">{{ value }}</div>
          <div class="list-item-content">{{ key }}</div>
        </div>
        <hr class="divider" />
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../../store/index";
import WorkflowGraph from "./cytoscape-graph.vue";
export default {
  props: ["workflow", "events"],
  components: {
    WorkflowGraph
  },
  data() {
    return {
      workflowLoading: true,
      clickedId: null,
      workflowName: null
    };
  },
  watch: {
    //We want to load a new workflow everytime we get a new runId
    runId: function() {
      this.resetData();
      this.setWorkFlow();
    }
  },
  methods: {
    delayedShow() {
      let delay = 500;
      setTimeout(() => {
        this.workflowLoading = false;
      }, delay);
    },
    selectNode(node) {
      store.commit("setSelectedNode", node.data.id);
    },
    route(runId) {
      this.$router.push({ name: "tree", params: { runId: runId } });
    },
    resetData() {
      store.commit("resetState"); //We reset the state every time we load a new workflow
      this.workflowLoading = false;
    }
  },
  mounted() {
    this.delayedShow();
    store.commit("resetState");
  },

  computed: {
    parentRoute() {
      return this.$store.getters.parentRoute;
    },
    selectedNodeInfo() {
      return this.$store.getters.selectedNodeInfo;
    },
    renderedNodes() {
      return this.$store.getters.renderedNodes;
    },
    hasChildBtn() {
      return this.$store.getters.childBtn;
    },
    btnText() {
      return this.$store.getters.btnText;
    },
    childRouteId() {
      return this.$store.getters.childRouteId;
    }
  }
};
</script>

<style scoped lang="stylus">
.tree-graph {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 24px;
}

.node-list {
  flex: 1;
  background-color: white;
  box-shadow: 0px 0px 9px 0px rgba(232, 232, 232, 1);
  border-radius: 2px;
  border: 1px solid #eaeaea;
  overflow-wrap: break-word;
  overflow-y: scroll;
  margin-right: 24px;
}

#graph {
  height: 100%;
}

#canvas {
  flex: 3;
  background-color: white;
  box-shadow: 0px 0px 9px 0px rgba(232, 232, 232, 1);
  border: 1px solid #eaeaea;
  overflow: hidden;
  position: relative;
}

hr.divider {
  border: 0;
  border-top: 1px solid #eaeaea;
  padding: 0;
}

.btn {
  margin-left: 20px;
  color: white;
  background-color: #11939A;
  font-weight: 600;
  text-decoration: none;
  border-radius: 2px;
  padding: 6px;
}

.section-header {
  height: 62px;
  display: flex;
  align-items: center;
  position: relative;

  &-text {
    font-weight: bold;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
}

.event-info {
  flex: 1;
  background-color: white;
  box-shadow: 0px 0px 9px 0px rgba(232, 232, 232, 1);
  border-radius: 2px;
  border: 1px solid #eaeaea;
  overflow-wrap: break-word;
  overflow-y: scroll;
  margin-left: 24px;

  &-btn {
    margin: 16px 20px;
    color: white;
    background-color: #11939A;
    font-weight: 600;
    border-radius: 2px;
    padding: 6px 0;
    cursor: pointer;
  }
}

.list-item {
  margin: 16px 24px;

  &-header {
    font-weight: 600;
    padding-bottom: 2px;
  }

  &-content {
    color: #7b7b7b;
    font-weight: 500;
  }
}

.list-container {
  text-align: left;

  &:last-child {
    hr {
      display: none;
    }
  }
}

/* ---- Loadig icon  ---- */
#loading {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid #11939A;
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>