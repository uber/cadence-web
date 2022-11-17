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

export const cliCommands = [
  {
    header: 'Domain commands',
    commands: [
      {
        id: 'cli-command-domain-register',
        label: 'Register a domain (local only)',
        value:
          'cadence --domain {domain-name} domain register --global_domain false',
      },
      {
        id: 'cli-command-domain-describe',
        label: 'List domain settings',
        value:
          'cadence --env {staging|prod|prod02} --domain {domain-name} domain describe',
      },
      {
        id: 'cli-command-domain-update-cluster',
        label:
          'Update domain active cluster (Make sure the domain_data has UberIgnoringLisa:true)',
        value:
          'cadence --env {staging|prod|prod02} --domain {domain-name} domain update -active_cluster {cluster-name}',
      },
      {
        id: 'cli-command-domain-update-bad-binary',
        label: 'Update domain bad binary',
        value:
          'cadence --env {staging|prod|prod02} --domain {domain-name} domain update --add_bad_binary {bad-binary-SHA} --reason \'"{reason}"\'',
      },
    ],
  },
  {
    header: 'workflow commands',
    commands: [
      {
        id: 'cli-command-workflow-run',
        label: 'Run a workflow',
        value:
          'cadence --env {staging|prod|prod02} --domain {domain-name} workflow run --tl {task-list-name} --wt {workflow-type-name} --et 60 -i \'"{input-string}"\'',
      },
      {
        id: 'cli-command-workflow-describe',
        label: 'See workflow settings',
        value:
          'cadence --env {staging|prod|prod02} --domain {domain-name} workflow describe -w {workflow-id} -r {run-id}',
      },
      {
        id: 'cli-command-workflow-show',
        label: 'See workflow history',
        value:
          'cadence --env {staging|prod|prod02} --domain {domain-name} workflow show -w {workflow-id} -r {run-id}',
      },
      {
        id: 'cli-command-workflow-signal',
        label: 'Signal a workflow',
        value:
          'cadence --env {staging|prod|prod02} --domain {domain-name} workflow signal -w {workflow-id} -r {run-id} --name {signal-name} --input \'"{signal-payload}"\'',
      },

      {
        description: [
          'Where event_id is the event to reset from',
          'and reset_type can be FirstDecisionTaskCompleted, LastDecisionTaskCompleted, LastContinueAsNew, BadBinary',
        ],
        id: 'cli-command-workflow-reset',
        label: 'Reset a workflow',
        value:
          'cadence workflow reset -w {workflow-id} -r {run-id} --event_id {event-id} --reason \'"{reason}"\' --reset_type {reset-type} --reset_bad_binary_checksum {bad-binary-SHA}',
      },
      {
        description: [
          'Where query can be any query that returns a list of workflows',
          'and reset_type can be FirstDecisionTaskCompleted, LastDecisionTaskCompleted, LastContinueAsNew, BadBinary',
        ],
        id: 'cli-command-workflow-reset-batch',
        label: 'Reset a batch of workflows',
        value:
          'cadence workflow reset-batch --query \'"{query}"\' --only_non_deterministic --reason \'"{reason}"\' --reset_type {reset-type}',
      },
      {
        id: 'cli-command-workflow-list',
        label: 'List closed workflows',
        value:
          'cadence --env {staging|prod|prod02} --domain {domain-name} workflow {list|listall}',
      },
      {
        id: 'cli-command-workflow-list-open',
        label: 'List open workflows',
        value:
          'cadence --env {staging|prod|prod02} --domain {domain-name} workflow {list|listall} --open',
      },
      {
        id: 'cli-command-workflow-query',
        label: 'Query for a workflow',
        value:
          'cadence workflow {list|listall} --query \'(CustomKeywordField = "keyword1" and CustomIntField >= 5) or CustomKeywordField = "keyword2" and CloseTime = missing\'',
      },
    ],
  },
];
