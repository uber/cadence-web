<template>
  <div class="date-range-picker">
    <date-picker
      range
      type="datetime"
      v-model="range"
      :clearable="false"
      :disabled-date="isDayDisabled"
      :showTimePanel="showTimePanel"

      :open.sync="open"
      @change="onDateRangeChange"
    >
      <template v-slot:input>
        <input
          placeholder="Date Range"
          readonly
          type="text"
          :value="rangeDisplayText"
        />
      </template>
      <template v-slot:sidebar>
        <div class="sidebar-column sidebar-column-shortcuts">
          <h5>Quick ranges</h5>
          <button
            class="mx-btn mx-btn-text mx-btn-shortcut"
            type="button"
            v-for="shortcut in shortcuts"
            :key="shortcut.value"
            @click="onShortcutClick(shortcut)"
          >{{ shortcut.text }}
          </button>
        </div>
        <div class="sidebar-column sidebar-column-custom-range">
          <h5>Custom range</h5>
          <div>
            <label for="custom-range-from">From:</label>
            <input id="custom-range-from" value="2020-03-10 14:09:00" />
          </div>
          <div>
            <label for="custom-range-to">to:</label>
            <input id="custom-range-to" value="2020-03-10 14:09:00" />
          </div>
          <div>
            <label for="custom-range-filtered-by">Filtered by:</label>
            <!-- open workflow it is by startTime, for closed workflow is is by closeTime -->
            <input id="custom-range-filtered-by" disabled value="StartTime" />
          </div>
          <div>
            <button class="sidebar-button">Apply</button>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button class="mx-btn mx-btn-text" @click="onClickTimePanelLabel">
          {{ timePanelLabel }}
        </button>
      </template>
    </date-picker>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import {
  getMinStartDate,
  getRange,
  getRangeDisplayText,
  getShortcuts,
  getTimePanelLabel,
  isDayDisabled,
} from './helpers';

export default {
  props: ['dateRange', 'maxDays'],
  data() {
    return {
      range: getRange(this.dateRange),
      open: false,
      showTimePanel: false,
    };
  },
  computed: {
    isDayDisabled() {
      return isDayDisabled(this.minStartDate);
    },
    minStartDate() {
      return getMinStartDate(this.maxDays);
    },
    rangeDisplayText() {
      return getRangeDisplayText(this.dateRange);
    },
    shortcuts() {
      return getShortcuts(this.maxDays, this.onShortcutClick);
    },
    timePanelLabel() {
      return getTimePanelLabel(this.showTimePanel);
    },
  },
  methods: {
    onShortcutClick(shortcut) {
      this.$emit('change', shortcut.value);
      this.open = false;
    },
    onDateRangeChange(range) {
      const [startTime, endTime] = range;

      if (!startTime || !endTime) {
        return;
      }

      this.$emit('change', { startTime, endTime });
    },
    onClickTimePanelLabel() {
      this.showTimePanel = !this.showTimePanel;
    },
  },
  components: {
    DatePicker,
  },
  watch: {
    dateRange() {
      this.range = getRange(this.dateRange);
    },
  },
};
</script>

<style lang="stylus">
sidebarColumnCustomRangeWidth = 185px;
sidebarColumnShortcutsWidth = 145px;
sidebarColumnPadding = 12px;
sidebarWidth = sidebarColumnShortcutsWidth + sidebarColumnCustomRangeWidth;

.mx-datepicker-popup {
  td {
    text-align: center;
  }

  .mx-datepicker-sidebar {
    padding: 6px 0;
    width: sidebarWidth;

    &+ .mx-datepicker-content {
      margin-left: sidebarWidth;
    }
  }

  .sidebar-column {
    float: left;
    height: 100%;
    padding: 0 sidebarColumnPadding;

    &+ .sidebar-column {
      border-left: 1px solid #e8e8e8;
    }

    label {
      display: block;
      font-weight: 500;
    }

    button {
      padding: 0;
    }

    input {
      margin: 0 0 8px 0;
      padding: 8px 10px;
      width: 160px;
    }
  }

  .sidebar-column-shortcuts {
    width: sidebarColumnShortcutsWidth;
  }

  .sidebar-column-custom-range {
    width: sidebarColumnCustomRangeWidth;
  }

  button.sidebar-button {
    background-color: #11939a;
    border: none;
    color: #fff;
    display: inline-block;
    float: right;
    font-size: 12px;
    font-weight: bold;
    padding: 8px 12px;
  }
}

.date-range-picker {
  input {
    border: 1px solid #e5e5e4;
    border-radius: 0;
    box-shadow: none;
    cursor: pointer;
    height: auto;
    margin: 0;
    padding: 8px 30px 8px 10px;
    width: 325px;
  }

  .mx-datepicker-range {
    width: auto;
  }
}
</style>
