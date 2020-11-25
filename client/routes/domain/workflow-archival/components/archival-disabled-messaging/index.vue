<script>
import {
  isHistoryArchivalEnabled,
  isVisibilityArchivalEnabled,
  replaceDomain,
} from '../../helpers';
import {
  archivalDisabledMessage,
  historyArchivalDisabledMessage,
  historyArchivalEnableCommand,
  historyArchivalLinks,
  visibilityArchivalDisabledMessage,
  visibilityArchivalEnableCommand,
} from './constants';

export default {
  name: 'archival-disabled-messaging',
  props: ['domainSettings'],
  data() {
    return {
      archivalDisabledMessage,
      historyArchivalDisabledMessage,
      historyArchivalLinks,
      visibilityArchivalDisabledMessage,
    };
  },
  computed: {
    isHistoryArchivalEnabled() {
      return isHistoryArchivalEnabled(this.domainSettings);
    },
    isVisibilityArchivalEnabled() {
      return isVisibilityArchivalEnabled(this.domainSettings);
    },
    historyArchivalEnableCommand() {
      return replaceDomain(historyArchivalEnableCommand, this.domainSettings);
    },
    visibilityArchivalEnableCommand() {
      return replaceDomain(
        visibilityArchivalEnableCommand,
        this.domainSettings
      );
    },
  },
};
</script>

<template>
  <div class="archival-disabled-messaging">
    <div class="message-group">
      <p v-for="(message, index) in archivalDisabledMessage" :key="index">
        {{ message }}
      </p>
      <div v-if="historyArchivalLinks">
        <div v-for="(link, index) in historyArchivalLinks" :key="index">
          <a :href="link.href" rel="noopener noreferrer" target="_blank">
            {{ link.label }}
          </a>
        </div>
      </div>
    </div>
    <div v-if="!isHistoryArchivalEnabled" class="message-group">
      <p>
        {{ historyArchivalDisabledMessage }}
      </p>
      <div v-if="historyArchivalEnableCommand">
        <pre>{{ historyArchivalEnableCommand }}</pre>
      </div>
    </div>
    <div v-if="!isVisibilityArchivalEnabled" class="message-group">
      <p>
        {{ visibilityArchivalDisabledMessage }}
      </p>
      <div v-if="visibilityArchivalEnableCommand">
        <pre>{{ visibilityArchivalEnableCommand }}</pre>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.archival-disabled-messaging {
  padding: 10px 50px;

  .message-group {
    margin: 20px 0;
  }

  a {
    font-size: 20px;
    line-height: 36px;
  }

  p {
    font-size: 20px;
    line-height: 36px;
  }

  pre {
    display: inline-block;
  }
}
</style>
