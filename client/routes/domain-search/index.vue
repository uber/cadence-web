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

import { DomainAutocomplete } from '~containers';

export default {
  name: 'domain-search',
  data() {
    return {};
  },
  components: {
    'domain-autocomplete': DomainAutocomplete,
  },
};
</script>

<template>
  <section class="domain-search">
    <domain-autocomplete :focus="true" />
  </section>
</template>

<style lang="stylus">
@require "../../styles/definitions"
section.domain-search {
  margin: layout-spacing-large auto;
  width: 500px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
