<template>
  <div class="tree-graph">
    <div id="canvas">
      <div class="section-header">
        <div
          class="btn"
          v-on:click="updateRoute(parentRoute)"
          v-if="parentRoute"
        >
          Go to parent
        </div>
        <div class="section-header-text">{{ workflowName }}</div>
      </div>
      <hr class="divider" />
      <div v-if="isGraphLoading" id="loading"></div>
      <button
        v-if="!hasAllEvents"
        id="refresh-btn"
        v-on:click="reloadWorkflow()"
      >
        Refresh
      </button>
      <WorkflowGraph
        :key="forceRefresh"
        v-if="!isGraphLoading"
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
        v-on:click="updateRoute(childRoute)"
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
import omit from "lodash-es/omit";
export default {
  props: ["workflow", "events", "isWorkflowRunning"],
  components: {
    WorkflowGraph
  },
  data() {
    return {
      isGraphLoading: true,
      clickedId: null,
      workflowName: null,
      forceRefresh: true,
      eventsSnapShot: [],
      hasAllEvents: true
    };
  },
  watch: {
    events: function() {
      //We have more events coming in
      this.hasAllEvents = false;
    }
  },
  methods: {
    delayedShow() {
      let delay = 400;
      setTimeout(() => {
        this.isGraphLoading = false;
      }, delay);
    },
    updateRoute(route) {
      this.$router.replace({
        params: { workflowId: route.workflowId, runId: route.runId },
        query: omit(this.$route.query, "eventId")
      });
    },
    reloadWorkflow() {
      this.eventsSnapShot = this.events;
      this.isGraphLoading = true;
      this.forceRefresh = !this.forceRefresh;
      this.delayedShow();
      //We currently show all available events, refresh btn should be hidden
      this.hasAllEvents = true;
    }
  },
  mounted() {
    this.delayedShow();
    this.eventsSnapShot = this.events;
    store.commit("resetState");
  },

  computed: {
    parentRoute() {
      return this.$store.getters.parentRoute;
    },
    selectedNodeInfo() {
      return this.$store.getters.selectedNodeInfo;
    },
    hasChildBtn() {
      return this.$store.getters.childBtn;
    },
    btnText() {
      return this.$store.getters.btnText;
    },
    childRoute() {
      return this.$store.getters.childRoute;
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

#refresh-btn {
  display: inline-block;
  padding: 13px 21px;
  transition: all 400ms ease;
  text-transform: uppercase;
  font-weight: 600;
  color: #fff;
  background-color: #11939a;
  white-space: nowrap;
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