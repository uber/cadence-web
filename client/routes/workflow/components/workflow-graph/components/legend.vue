<script>
// Copyright (c) 2020-2021 Uber Technologies Inc.
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

export default {
  name: 'legend',
  data() {
    return {
      showLegend: false,
      connections: [
        {
          name: 'direct',
          text:
            'Represents direct connections, when a child has the id of the parent',
        },
        { name: 'chron', text: 'Represents chronological connections' },
        {
          name: 'inferred',
          text:
            'Represents connections between a signal and its triggered child ',
        },
      ],
    };
  },
};
</script>

<template>
  <div v-on:click="showLegend = !showLegend" class="legend">
    <div v-if="!showLegend" class="legend-preview">
      <div class="arrow-container">
        <span class="arrow direct"></span>
        <hr class="direct" />
      </div>
    </div>
    <div v-if="showLegend">
      <transition-group appear name="fade">
        <div v-for="connection in connections" :key="connection.name">
          <div class="legend-example">
            <div class="arrow-container">
              <span :class="connection.name" class="pic arrow"></span>
              <hr :class="connection.name" />
            </div>
            <div class="text">{{ connection.text }}</div>
          </div>
          <hr class="divider" />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="stylus">
@require '../../../../../styles/definitions.styl';
.legend {
  background-color: white;
  border: 1px solid #eaeaea;
  box-shadow: 0px 0px 9px 0px rgba(232, 232, 232, 1);
  width: fit-content;
   max-width: 200px;
  position: absolute;
  right: inline-spacing-large;
  bottom: inline-spacing-large;
  cursor: pointer;
  z-index: 10;

  &-example {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: inline-spacing-large;
  }
  &-preview {
    margin: inline-spacing-small inline-spacing-large;
  }
}

hr {
  width: 40px;
  margin-left: 2px;

  &.direct {
    border-top: 2px solid uber-black-90;
  }

  &.chron {
    border-top: 2px solid secondary-color;
  }

  &.inferred {
    border-top: 2px solid uber-yellow ;
  }
}

hr.divider {
  border: 0;
  border-top: 1px solid #eaeaea;
  width: 100%;
  padding: 0;

  &:last-child {
    display:none;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.text {
  margin-top: 10px;
}

.arrow-container {
  display: flex;
  align-items: center;
}

.arrow {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;

  &.direct {
    border-right: 6px solid uber-black-90;
  }

  &.chron {
    border-right: 6px solid secondary-color;
  }

  &.inferred {
    border-right: 6px solid uber-yellow;
  }
}
</style>
