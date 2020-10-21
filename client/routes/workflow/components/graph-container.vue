<template>
  <div class="tree-graph">
    <div id="canvas">
      <div class="thead" ref="thead">
        <!--   <div class="section-header">-->
        <div
          class="aside-left"
          v-on:click="updateRoute(parentRoute)"
          v-if="parentRoute"
        >
          To parent
        </div>
        <div class="aside-center">{{ workflowName }}</div>
        <div
          class="aside-right"
          v-if="hasChildBtn"
          v-on:click="updateRoute(childRoute)"
        >
          {{ btnText }}
        </div>
      </div>
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
    this.workflowName = this.events[0].details.workflowType.name;
    store.commit("resetState");
  },

  computed: {
    parentRoute() {
      return this.$store.getters.parentRoute;
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