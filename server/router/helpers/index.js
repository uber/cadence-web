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

const buildQueryString = require('./build-query-string');
const delay = require('./delay');
const injectDomainIntoWorkflowList = require('./inject-domain-into-workflow-list');
const isAdvancedVisibilityEnabled = require('./is-advanced-visibility-enabled');
const listWorkflows = require('./list-workflows');
const mapHistoryResponse = require('./map-history-response');
const momentToLong = require('./moment-to-long');
const replacer = require('./replacer');

module.exports = {
  buildQueryString,
  delay,
  injectDomainIntoWorkflowList,
  isAdvancedVisibilityEnabled,
  listWorkflows,
  mapHistoryResponse,
  momentToLong,
  replacer,
};
