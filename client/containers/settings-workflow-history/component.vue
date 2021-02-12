<script>
// Copyright (c) 2017-2021 Uber Technologies Inc.
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

import { ToggleButton } from 'vue-js-toggle-button';
import {
  ButtonFill,
  ButtonIcon,
  FeatureFlag,
  FlexGrid,
  FlexGridItem,
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
      modal: {
        workflowHistoryEventHighlightListEnabled: this
          .workflowHistoryEventHighlightListEnabled,
        workflowHistoryEventHighlightList: this
          .workflowHistoryEventHighlightList,
      },
      workflowEventTypes: WORKFLOW_EVENT_TYPES,
    };
  },
  computed: {
    isSettingsChanged() {
      for (const setting in this.modal) {
        if (this.hasSettingChanged(setting)) {
          return true;
        }
      }

      return false;
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

      this.modal.workflowHistoryEventHighlightList = workflowHistoryEventHighlightListAddOrUpdate(
        {
          ...event,
          [key]: value,
          workflowHistoryEventHighlightList: this.modal
            .workflowHistoryEventHighlightList,
        }
      );
      this.isWorkflowHistoryEventHighlightListChanged = true;
    },
    onWorkflowHistoryEventHighlightListRemove({ id }) {
      this.modal.workflowHistoryEventHighlightList = workflowHistoryEventHighlightListRemove(
        {
          id,
          workflowHistoryEventHighlightList: this.modal
            .workflowHistoryEventHighlightList,
        }
      );
      this.isWorkflowHistoryEventHighlightListChanged = true;
    },
    onWorkflowHistoryEventHighlightListAdd() {
      this.modal.workflowHistoryEventHighlightList = workflowHistoryEventHighlightListAddOrUpdate(
        {
          eventParamName: '',
          eventType: WORKFLOW_EVENT_TYPES[0],
          id: new Date().getTime(),
          isEnabled: true,
          workflowHistoryEventHighlightList: this.modal
            .workflowHistoryEventHighlightList,
        }
      );
      this.isWorkflowHistoryEventHighlightListChanged = true;
    },
    onSettingChange({ name, value }) {
      this.modal[name] = value;
    },
    onChange({ name, value }) {
      this.$emit('onChange', { name, value });
    },
    onSubmit() {
      this.$emit('change', {
        ...this.addSettingIfChanged('workflowHistoryEventHighlightListEnabled'),
        ...this.addSettingIfChanged('workflowHistoryEventHighlightList'),
      });
      this.$emit('onSubmit');
    },
    addSettingIfChanged(name) {
      return (
        this.hasSettingChanged(name) && {
          [name]: this.modal[name],
        }
      );
    },
    hasSettingChanged(name) {
      if (name === 'workflowHistoryEventHighlightList') {
        return this.isWorkflowHistoryEventHighlightListChanged;
      }

      return this.modal[name] !== this[name];
    },
  },
  components: {
    'button-fill': ButtonFill,
    'button-icon': ButtonIcon,
    'feature-flag': FeatureFlag,
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
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
          :value="modal.workflowHistoryEventHighlightListEnabled"
          @change="onSettingChange"
        />
      </div>

      <div
        class="history-event-param-content"
        :class="{ disabled: !modal.workflowHistoryEventHighlightListEnabled }"
      >
        <div class="content-item">
          <flex-grid align-items="center">
            <flex-grid-item grow="1">
              <h4>History event params</h4>
            </flex-grid-item>
            <flex-grid-item>
              <button-fill
                :disabled="!modal.workflowHistoryEventHighlightListEnabled"
                label="NEW"
                @click="onWorkflowHistoryEventHighlightListAdd"
              />
            </flex-grid-item>
          </flex-grid>
        </div>

        <div class="scrollable">
          <div
            class="content-item"
            v-for="event in modal.workflowHistoryEventHighlightList"
            :key="event.id"
          >
            <flex-grid align-items="center">
              <flex-grid-item grow="1">
                <flex-grid align-items="center">
                  <flex-grid-item grow="1" width="345px">
                    <v-select
                      :disabled="
                        !modal.workflowHistoryEventHighlightListEnabled ||
                          !event.isEnabled
                      "
                      :value="event.eventType"
                      :options="workflowEventTypes"
                      :on-change="
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
                        !modal.workflowHistoryEventHighlightListEnabled ||
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
                  :disabled="!modal.workflowHistoryEventHighlightListEnabled"
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
                  :disabled="!modal.workflowHistoryEventHighlightListEnabled"
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
