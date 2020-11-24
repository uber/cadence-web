<script>
// Copyright (c) 2017-2020 Uber Technologies Inc.
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
import ButtonFill from '../../button-fill';
import ButtonIcon from '../../button-icon';
import FlexGrid from '../../flex-grid';
import FlexGridItem from '../../flex-grid-item';
import TextInput from '../../text-input';
import SettingsFooter from './settings-footer';
import SettingsToggle from './settings-toggle';
import {
  workflowHistoryEventHighlightListAddOrUpdate,
  workflowHistoryEventHighlightListRemove,
} from '~helpers';
import { WORKFLOW_EVENT_TYPES } from '~constants';

export default {
  name: 'settings-workflow-history',
  props: {
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
    },
  },
  components: {
    'button-fill': ButtonFill,
    'button-icon': ButtonIcon,
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
                    <v-select
                      :disabled="
                        !modalWorkflowHistoryEventHighlightListEnabled ||
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
      :submit-enabled="isSettingsChanged"
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
    height: 200px;
  }
}
</style>
