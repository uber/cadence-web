<template>
  <div class="tree-graph">
    <div id="canvas">
      <div class="thead" ref="thead">
        <!--   <div class="section-header">-->
        <div
          class="aside-left"
          v-if="parentRoute"
          v-on:click="updateRoute(parentRoute)"
        >
          {{ parentBtnText }}
        </div>
        <div class="aside-center">
          {{ workflowName }}
        </div>
        <div
          class="aside-right"
          v-if="hasChildBtn"
          v-on:click="updateRoute(childRoute)"
        >
          {{ childBtnText }}
        </div>
      </div>
      <div v-if="isGraphLoading" id="loading"></div>
      <div class="refresh" v-if="!hasAllEvents" v-on:click="reloadWorkflow()">
        Refresh
      </div>
      <Legend />
      <WorkflowGraph
        :key="forceRefresh"
        v-if="!isGraphLoading"
        :workflow="workflow"
        :events="events"
      />
    </div>
  </div>
</template>

<script>
import store from "../../../store/index";
import WorkflowGraph from "./cytoscape-graph.vue";
import omit from "lodash-es/omit";
import Legend from "./graph-legend.vue";
export default {
  props: ["workflow", "events", "isWorkflowRunning"],
  components: {
    WorkflowGraph,
    Legend
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
      if (this.eventsSnapShot.length < this.events.length)
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
      if (route.workflowId) {
        this.$router.replace({
          params: { workflowId: route.workflowId, runId: route.runId },
          query: omit(this.$route.query, "eventId")
        });

        //We only have run Id as route params
      } else {
        this.$router.replace({
          params: { runId: route },
          query: omit(this.$route.query, "eventId")
        });
      }
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
    this.workflowName = this.events[0].details.workflowType.name;
    store.commit("resetState");
  },

  computed: {
    parentRoute() {
      return this.$store.getters.parentRoute;
    },
    parentBtnText() {
      return this.$store.getters.parentBtnText;
    },
    hasChildBtn() {
      return this.$store.getters.hasChildBtn;
    },
    childBtnText() {
      return this.$store.getters.childBtnText;
    },
    childRoute() {
      return this.$store.getters.childRoute;
    }
  }
};
</script>

<style scoped lang="stylus">
@require '../../../styles/definitions.styl';

.tree-graph {
  width: 100%;
  height: 100%;
}

div.thead {
  .aside-right {
    margin: inline-spacing-small inline-spacing-small inline-spacing-small auto;
    action-button();
  }

  .aside-center {
    flex: 1;
    font-weight: 500;
    text-align: center;
    margin: auto;
    padding: 0 inline-spacing-small;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .aside-left {
    margin: inline-spacing-small auto inline-spacing-small inline-spacing-small;
    action-button();
  }
}

.thead {
  background-color: uber-white-10;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  padding: 0 inline-spacing-large;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 60px;
}

#canvas {
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0px 0px 9px 0px rgba(232, 232, 232, 1);
  border: 1px solid #eaeaea;
  overflow: hidden;
  position: relative;
}

.refresh {
  action-button();
  icon-refresh();
  position: absolute;
  top: 'calc(%s + %s)' % (60px inline-spacing-large);
  right: inline-spacing-large;
  z-index: 3;
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