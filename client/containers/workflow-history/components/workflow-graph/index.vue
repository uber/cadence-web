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

import omit from 'lodash-es/omit';
import Graph from './components/graph.vue';
import GraphLegend from './components/graph-legend.vue';
import { GRAPH_SHOW_DELAY } from './constants';

export default {
  name: 'workflow-graph',
  props: ['events', 'isWorkflowRunning', 'selectedEventId'],
  components: {
    Graph,
    GraphLegend,
  },
  data() {
    return {
      isGraphLoading: true,
      forceRefresh: true,
      eventsSnapShot: [],
    };
  },
  methods: {
    delayedShow() {
      setTimeout(() => {
        this.isGraphLoading = false;
      }, GRAPH_SHOW_DELAY);
    },
    updateRoute(route) {
      const params = route.workflowId
        ? { workflowId: route.workflowId, runId: route.runId }
        : { runId: route };

      this.$router.replace({
        params,
        query: omit(this.$route.query, 'eventId'),
      });
    },
    reloadWorkflow() {
      this.eventsSnapShot = this.events;
      this.isGraphLoading = true;

      // NOTE: This is needed because the graph library being used is not vue reactive (jquery based).
      // You can read about this approach here: https://michaelnthiessen.com/force-re-render/
      this.forceRefresh = !this.forceRefresh;
      this.delayedShow();
    },
  },
  mounted() {
    this.delayedShow();
    this.eventsSnapShot = this.events;
    this.$store.commit('resetGraphState');
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
    },
    hasAllEvents() {
      return this.eventsSnapShot.length === this.events.length;
    },
    workflowName() {
      return this.events[0] && this.events[0].details.workflowType.name;
    },
  },
};
</script>

<template>
  <div class="tree-graph">
    <div id="canvas">
      <div class="thead" ref="thead">
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
      <GraphLegend />
      <Graph
        :key="forceRefresh"
        v-if="!isGraphLoading"
        :events="events"
        :selected-event-id="selectedEventId"
      />
    </div>
  </div>
</template>

<style scoped lang="stylus">
@require '../../../../styles/definitions.styl';

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

/* ---- Loading icon  ---- */
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
