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

import { ToggleButton } from 'vue-js-toggle-button';
import {
  ButtonFill,
  ButtonIcon,
  FeatureFlag,
  FlexGrid,
  FlexGridItem,
  SelectInput,
  SettingsFooter,
  SettingsToggle,
  TextInput,
} from '~components';
import { WORKFLOW_EVENT_TYPES } from '~constants';
import {
  workflowHistoryEventHighlightListAddOrUpdate,
  workflowHistoryEventHighlightListRemove,
} from '~helpers';

export default {
  name: 'settings-workflow-history',
  props: {
    graphEnabled: {
      type: Boolean,
    },
    isSubmitEnabled: {
      type: Boolean,
    },
    workflowHistoryEventHighlightList: {
      type: Array,
    },
    workflowHistoryEventHighlightListEnabled: {
      type: Boolean,
    },
  },
  data() {
    return {
      isWorkflowHistoryEventHighlightListChanged: false,
      modalWorkflowHistoryEventHighlightListEnabled: this
        .workflowHistoryEventHighlightListEnabled,
      modalWorkflowHistoryEventHighlightList: this
        .workflowHistoryEventHighlightList,
      workflowEventTypes: WORKFLOW_EVENT_TYPES,
    };
  },
  computed: {
    isWorkflowHistoryEventHighlightListEnabledChanged() {
      return (
        this.modalWorkflowHistoryEventHighlightListEnabled !==
        this.workflowHistoryEventHighlightListEnabled
      );
    },
    isSettingsChanged() {
      return (
        this.isWorkflowHistoryEventHighlightListChanged ||
        this.isWorkflowHistoryEventHighlightListEnabledChanged
      );
    },
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
    onWorkflowHistoryEventHighlightListChange({ event, key, value }) {
      if (event[key] === value) {
        return;
      }

      this.modalWorkflowHistoryEventHighlightList = workflowHistoryEventHighlightListAddOrUpdate(
        {
          ...event,
          [key]: value,
          workflowHistoryEventHighlightList: this
            .modalWorkflowHistoryEventHighlightList,
        }
      );
      this.isWorkflowHistoryEventHighlightListChanged = true;
    },
    onWorkflowHistoryEventHighlightListRemove({ id }) {
      this.modalWorkflowHistoryEventHighlightList = workflowHistoryEventHighlightListRemove(
        {
          id,
          workflowHistoryEventHighlightList: this
            .modalWorkflowHistoryEventHighlightList,
        }
      );
      this.isWorkflowHistoryEventHighlightListChanged = true;
    },
    onWorkflowHistoryEventHighlightListAdd() {
      this.modalWorkflowHistoryEventHighlightList = workflowHistoryEventHighlightListAddOrUpdate(
        {
          eventParamName: '',
          eventType: WORKFLOW_EVENT_TYPES[0],
          id: new Date().getTime(),
          isEnabled: true,
          workflowHistoryEventHighlightList: this
            .modalWorkflowHistoryEventHighlightList,
        }
      );
      this.isWorkflowHistoryEventHighlightListChanged = true;
    },
    onWorkflowHistoryEventHighlightListEnabledChange({ value }) {
      this.modalWorkflowHistoryEventHighlightListEnabled = value;
    },
    onChange({ name, value }) {
      this.$emit('onChange', { name, value });
    },
    onSubmit() {
      this.$emit('change', {
        ...(this.isWorkflowHistoryEventHighlightListEnabledChanged && {
          workflowHistoryEventHighlightListEnabled: this
            .modalWorkflowHistoryEventHighlightListEnabled,
        }),
        ...(this.isWorkflowHistoryEventHighlightListChanged && {
          workflowHistoryEventHighlightList: this
            .modalWorkflowHistoryEventHighlightList,
        }),
      });
      this.$emit('onSubmit');
    },
  },
  components: {
    'button-fill': ButtonFill,
    'button-icon': ButtonIcon,
    'feature-flag': FeatureFlag,
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
    'select-input': SelectInput,
    'settings-footer': SettingsFooter,
    'settings-toggle': SettingsToggle,
    'text-input': TextInput,
    'toggle-button': ToggleButton,
  },
};
</script>

<template>
  <div class="settings-workflow-history">
    <div class="content">
      <div class="content-item">
        <feature-flag name="workflowGraph">
          <settings-toggle
            label="Enable history graph"
            name="graphEnabled"
            :value="graphEnabled"
            @change="onChange"
          />
        </feature-flag>
      </div>
      <div class="content-item">
        <settings-toggle
          label="Enable history event param highlighting"
          name="workflowHistoryEventHighlightListEnabled"
          :value="modalWorkflowHistoryEventHighlightListEnabled"
          @change="onWorkflowHistoryEventHighlightListEnabledChange"
        />
      </div>

      <div
        class="history-event-param-content"
        :class="{ disabled: !modalWorkflowHistoryEventHighlightListEnabled }"
      >
        <div class="content-item">
          <flex-grid align-items="center">
            <flex-grid-item grow="1">
              <h4>History event params</h4>
            </flex-grid-item>
            <flex-grid-item>
              <button-fill
                :disabled="!modalWorkflowHistoryEventHighlightListEnabled"
                label="NEW"
                @click="onWorkflowHistoryEventHighlightListAdd"
              />
            </flex-grid-item>
          </flex-grid>
        </div>

        <div class="scrollable">
          <div
            class="content-item"
            v-for="event in modalWorkflowHistoryEventHighlightList"
            :key="event.id"
          >
            <flex-grid align-items="center">
              <flex-grid-item grow="1">
                <flex-grid align-items="center">
                  <flex-grid-item grow="1" width="345px">
                    <select-input
                      :disabled="
                        !modalWorkflowHistoryEventHighlightListEnabled ||
                          !event.isEnabled
                      "
                      label="Event type"
                      name="eventType"
                      :options="workflowEventTypes"
                      :value="event.eventType"
                      @change="
                        value =>
                          onWorkflowHistoryEventHighlightListChange({
                            event,
                            key: 'eventType',
                            value,
                          })
                      "
                    />
                  </flex-grid-item>
                  <flex-grid-item>
                    <text-input
                      label="Event param name"
                      :disabled="
                        !modalWorkflowHistoryEventHighlightListEnabled ||
                          !event.isEnabled
                      "
                      :value="event.eventParamName"
                      @input="
                        ({ target: { value } }) =>
                          onWorkflowHistoryEventHighlightListChange({
                            event,
                            key: 'eventParamName',
                            value,
                          })
                      "
                    />
                  </flex-grid-item>
                </flex-grid>
              </flex-grid-item>
              <flex-grid-item>
                <toggle-button
                  :disabled="!modalWorkflowHistoryEventHighlightListEnabled"
                  :labels="true"
                  :value="event.isEnabled"
                  @change="
                    ({ value }) =>
                      onWorkflowHistoryEventHighlightListChange({
                        event,
                        key: 'isEnabled',
                        value,
                      })
                  "
                />
              </flex-grid-item>
              <flex-grid-item>
                <button-icon
                  :disabled="!modalWorkflowHistoryEventHighlightListEnabled"
                  icon="icon_trash"
                  size="20px"
                  @click="onWorkflowHistoryEventHighlightListRemove(event)"
                />
              </flex-grid-item>
            </flex-grid>
          </div>
        </div>
      </div>
    </div>
    <settings-footer
      :submit-enabled="isSubmitEnabled || isSettingsChanged"
      @cancel="onClose"
      @submit="onSubmit"
    />
  </div>
</template>

<style lang="stylus">
.settings-workflow-history {
  .history-event-param-content {
    &.disabled {
      opacity: 0.3;
    }
  }

  .scrollable {
    overflow-y: auto;
    height: 165px;
    margin-bottom: 10px;
  }
}
</style>
