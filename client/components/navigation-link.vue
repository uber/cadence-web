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

export default {
  name: 'navigation-link',
  props: {
    exact: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    notificationCount: {
      type: Number,
      default: 0,
    },
    params: {
      type: Object,
    },
    to: {
      type: [String, Object],
    },
  },
};
</script>

<template>
  <router-link
    class="navigation-link"
    :class="icon"
    :exact="exact"
    :id="id"
    :params="params"
    :to="to"
  >
    <span>{{ label }}</span>
    <span class="notification" v-if="notificationCount">{{
      notificationCount
    }}</span>
  </router-link>
</template>

<style lang="stylus">
a.navigation-link {
  border-bottom: 4px solid transparent;
  display: inline-block;
  font-weight: 500;
  padding: 11px 18px;
  text-transform: uppercase;
  transition: all 400ms ease;

  &:before {
    font-family: 'uber-icons';
    margin-right: 5px;
  }

  &:focus, &:hover {
    border-bottom-color: #0e767b;
    outline: none;
  }

  &.router-link-active {
    border-bottom-color: #11939a;
  }

  & > .notification {
    background-color: #11939a;
    border-radius: 7px;
    color: black;
    font-size: 12px;
    margin-left: 5px;
    padding: 0 6px;
  }
}
</style>
