<template>
  <section class="workflow-archives" :class="{ loading }">
    <div v-if="!loading">
      <div class="disabled-messages" v-if="!isEnabled">
        <div class="message-group">
          <p
            v-for="(message, index) in archivesDisabledMessage"
            :key="index"
          >
            {{ message }}
          </p>
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
      <div v-if="isEnabled">
        Page Enabled!
      </div>
    </div>
  </section>
</template>

<script>
import {
  archivesDisabledMessage,
  historyArchivalDisabledMessage,
  historyArchivalEnableCommand,
  visibilityArchivalDisabledMessage,
  visibilityArchivalEnableCommand,
} from './constants';
import DomainService from '../domain-service';
import {
  isHistoryArchivalEnabled,
  isVisibilityArchivalEnabled,
  replaceDomain,
} from './helpers';

export default {
  props: ['domain'],
  data() {
    return {
      archivesDisabledMessage,
      domainSettings: {},
      historyArchivalDisabledMessage,
      historyArchivalEnableCommand: '',
      loading: true,
      visibilityArchivalDisabledMessage,
      visibilityArchivalEnableCommand: '',
    };
  },
  async created() {
    const domainService = DomainService();
    this.domainSettings = await domainService.getDomainSettings(this.domain);
    this.historyArchivalEnableCommand = replaceDomain(
      historyArchivalEnableCommand,
      this.domainSettings,
    );
    this.visibilityArchivalEnableCommand = replaceDomain(
      visibilityArchivalEnableCommand,
      this.domainSettings,
    );
    this.loading = false;
  },
  computed: {
    isEnabled() {
      return this.isHistoryArchivalEnabled && this.isVisibilityArchivalEnabled;
    },
    isHistoryArchivalEnabled() {
      return isHistoryArchivalEnabled(this.domainSettings);
    },
    isVisibilityArchivalEnabled() {
      return isVisibilityArchivalEnabled(this.domainSettings);
    },
  },
};
</script>

<style lang="stylus">
  section.workflow-archives {
    .disabled-messages {
      padding: 10px 50px;
    }

    .message-group {
      margin: 20px 0;
    }

    p {
      font-size: 20px;
      line-height: 24px;
      margin: 5px 0;
    }

    pre {
      display: inline-block;
    }
  }
</style>