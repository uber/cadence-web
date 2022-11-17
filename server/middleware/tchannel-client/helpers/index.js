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

const cliTransform = require('./cli-transform');
const formatBody = require('./format-body');
const formatMethod = require('./format-method');
const formatRequestName = require('./format-request-name');
const lookupAsync = require('./lookup-async');
const makeChannels = require('./make-channels');
const makeRequest = require('./make-request');
const uiTransform = require('./ui-transform');
const withDomainPaging = require('./with-domain-paging');
const withNextPageTokenBodyTransform = require('./with-next-page-token-body-transform');
const withVerboseWorkflowExecution = require('./with-verbose-workflow-execution');
const withWorkflowExecution = require('./with-workflow-execution');

module.exports = {
  cliTransform,
  formatBody,
  formatMethod,
  formatRequestName,
  lookupAsync,
  makeChannels,
  makeRequest,
  uiTransform,
  withDomainPaging,
  withNextPageTokenBodyTransform,
  withVerboseWorkflowExecution,
  withWorkflowExecution,
};
