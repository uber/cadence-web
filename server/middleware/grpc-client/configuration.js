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

const serviceConfiguration = {
  adminServiceConfig: {
    schemaPath: 'uber/cadence/admin/v1/service.proto',
    servicePath: 'uber.cadence.admin.v1.AdminAPI',
  },
  domainServiceConfig: {
    schemaPath: 'uber/cadence/api/v1/service_domain.proto',
    servicePath: 'uber.cadence.api.v1.DomainAPI',
  },
  visibilityServiceConfig: {
    schemaPath: 'uber/cadence/api/v1/service_visibility.proto',
    servicePath: 'uber.cadence.api.v1.VisibilityAPI',
  },
  workflowServiceConfig: {
    schemaPath: 'uber/cadence/api/v1/service_workflow.proto',
    servicePath: 'uber.cadence.api.v1.WorkflowAPI',
  },
};

module.exports = serviceConfiguration;
