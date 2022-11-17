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

import { ROUTE_PARAMS_DOMAIN, ROUTE_QUERY } from '../route/getter-types';
import {
  PENDING_TASK_TYPE_ACTIVITY,
  PENDING_TASK_TYPE_CHILD_WORKFLOW,
  PENDING_TASK_TYPE_DECISION,
} from '../workflow/constants';
import {
  WORKFLOW_EXECUTION_PENDING_ACTIVITIES,
  WORKFLOW_EXECUTION_PENDING_CHILDREN,
  WORKFLOW_EXECUTION_PENDING_DECISIONS,
} from '../workflow/getter-types';
import {
  PENDING_TASK_FILTER_ACTIVITIES,
  PENDING_TASK_FILTER_ALL,
  PENDING_TASK_FILTER_CHILDREN,
  PENDING_TASK_FILTER_DECISIONS,
} from './constants';
import {
  WORKFLOW_PENDING_ACTIVE_FILTER,
  WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE,
  WORKFLOW_PENDING_ACTIVE_PENDING_TASK_LIST,
} from './getter-types';
import workflowPendingGetterFns from './getters';
import { initGetters } from '~test';

describe('workflow pending getters', () => {
  describe('when calling getters[WORKFLOW_PENDING_ACTIVE_FILTER]', () => {
    describe('and getters[ROUTE_QUERY] returns empty object', () => {
      it('should return PENDING_TASK_FILTER_ALL.', () => {
        const getterFns = {
          ...workflowPendingGetterFns,
          [ROUTE_QUERY]: () => ({}),
        };
        const getters = initGetters({ getterFns });
        const output = getters[WORKFLOW_PENDING_ACTIVE_FILTER];

        expect(output).toEqual(PENDING_TASK_FILTER_ALL);
      });
    });

    describe('and getters[ROUTE_QUERY] returns { filter: "activity" }', () => {
      it('should return "activity".', () => {
        const getterFns = {
          ...workflowPendingGetterFns,
          [ROUTE_QUERY]: () => ({ filter: 'activity' }),
        };
        const getters = initGetters({ getterFns });
        const output = getters[WORKFLOW_PENDING_ACTIVE_FILTER];

        expect(output).toEqual('activity');
      });
    });
  });

  describe('when calling getters[WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE]', () => {
    describe('and getters[WORKFLOW_PENDING_ACTIVE_FILTER] returns PENDING_TASK_FILTER_ALL', () => {
      it('should return "No pending tasks".', () => {
        const getterFns = {
          ...workflowPendingGetterFns,
          [WORKFLOW_PENDING_ACTIVE_FILTER]: () => PENDING_TASK_FILTER_ALL,
        };
        const getters = initGetters({ getterFns });
        const output = getters[WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE];

        expect(output).toEqual('No pending tasks');
      });
    });

    describe('and getters[WORKFLOW_PENDING_ACTIVE_FILTER] returns PENDING_TASK_FILTER_ACTIVITIES', () => {
      it('should return "No pending activities".', () => {
        const getterFns = {
          ...workflowPendingGetterFns,
          [WORKFLOW_PENDING_ACTIVE_FILTER]: () =>
            PENDING_TASK_FILTER_ACTIVITIES,
        };
        const getters = initGetters({ getterFns });
        const output = getters[WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE];

        expect(output).toEqual('No pending activities');
      });
    });

    describe('and getters[WORKFLOW_PENDING_ACTIVE_FILTER] returns PENDING_TASK_FILTER_CHILDREN', () => {
      it('should return "No pending child workflows".', () => {
        const getterFns = {
          ...workflowPendingGetterFns,
          [WORKFLOW_PENDING_ACTIVE_FILTER]: () => PENDING_TASK_FILTER_CHILDREN,
        };
        const getters = initGetters({ getterFns });
        const output = getters[WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE];

        expect(output).toEqual('No pending child workflows');
      });
    });

    describe('and getters[WORKFLOW_PENDING_ACTIVE_FILTER] returns PENDING_TASK_FILTER_DECISIONS', () => {
      it('should return "No pending decisions".', () => {
        const getterFns = {
          ...workflowPendingGetterFns,
          [WORKFLOW_PENDING_ACTIVE_FILTER]: () => PENDING_TASK_FILTER_DECISIONS,
        };
        const getters = initGetters({ getterFns });
        const output = getters[WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE];

        expect(output).toEqual('No pending decisions');
      });
    });

    describe('and getters[WORKFLOW_PENDING_ACTIVE_FILTER] returns undefined', () => {
      it('should return "No results".', () => {
        const getterFns = {
          ...workflowPendingGetterFns,
          [WORKFLOW_PENDING_ACTIVE_FILTER]: () => undefined,
        };
        const getters = initGetters({ getterFns });
        const output = getters[WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE];

        expect(output).toEqual('No results');
      });
    });
  });

  describe('when calling getters[WORKFLOW_PENDING_ACTIVE_PENDING_TASK_LIST]', () => {
    describe(
      [
        'and getters[ROUTE_PARAMS_DOMAIN] returns "samples-domain" and ',
        'getters[WORKFLOW_PENDING_ACTIVE_FILTER] returns PENDING_TASK_FILTER_ACTIVITIES and ',
        'getters[WORKFLOW_EXECUTION_PENDING_ACTIVITIES] returns a pending activity list',
      ].join(''),
      () => {
        it('should return a mapped pending activity list.', () => {
          const getterFns = {
            ...workflowPendingGetterFns,
            [ROUTE_PARAMS_DOMAIN]: () => 'samples-domain',
            [WORKFLOW_PENDING_ACTIVE_FILTER]: () =>
              PENDING_TASK_FILTER_ACTIVITIES,
            [WORKFLOW_EXECUTION_PENDING_ACTIVITIES]: () => [
              {
                activityID: 'activity-id-1',
                pendingTaskType: PENDING_TASK_TYPE_ACTIVITY,
              },
            ],
          };
          const getters = initGetters({ getterFns });
          const output = getters[WORKFLOW_PENDING_ACTIVE_PENDING_TASK_LIST];

          expect(output).toEqual([
            {
              activityID: 'activity-id-1',
              kvps: [
                {
                  key: 'activityID',
                  value: 'activity-id-1',
                },
              ],
              pendingTaskId: 'PENDING_TASK_TYPE_ACTIVITY_activity-id-1',
              pendingTaskType: PENDING_TASK_TYPE_ACTIVITY,
              pendingTaskTypeDisplay: 'PendingActivityTask',
            },
          ]);
        });
      }
    );

    describe(
      [
        'and getters[ROUTE_PARAMS_DOMAIN] returns "samples-domain" and ',
        'getters[WORKFLOW_PENDING_ACTIVE_FILTER] returns PENDING_TASK_FILTER_CHILDREN and ',
        'getters[WORKFLOW_EXECUTION_PENDING_CHILDREN] returns a pending child workflow list',
      ].join(''),
      () => {
        it('should return a mapped pending child workflow list.', () => {
          const getterFns = {
            ...workflowPendingGetterFns,
            [ROUTE_PARAMS_DOMAIN]: () => 'samples-domain',
            [WORKFLOW_PENDING_ACTIVE_FILTER]: () =>
              PENDING_TASK_FILTER_CHILDREN,
            [WORKFLOW_EXECUTION_PENDING_CHILDREN]: () => [
              {
                initiatedID: 'initiated-id-1',
                pendingTaskType: PENDING_TASK_TYPE_CHILD_WORKFLOW,
                runID: 'run-id-1',
                workflowID: 'workflow-id-1',
              },
            ],
          };
          const getters = initGetters({ getterFns });
          const output = getters[WORKFLOW_PENDING_ACTIVE_PENDING_TASK_LIST];

          expect(output).toEqual([
            {
              initiatedID: 'initiated-id-1',
              kvps: [
                {
                  key: 'initiatedID',
                  value: 'initiated-id-1',
                },
                {
                  key: 'runID',
                  routeLink: {
                    name: 'workflow/summary',
                    params: {
                      domain: 'samples-domain',
                      runId: 'run-id-1',
                      workflowId: 'workflow-id-1',
                    },
                  },
                  value: 'run-id-1',
                },
                {
                  key: 'workflowID',
                  value: 'workflow-id-1',
                },
              ],
              pendingTaskId: 'PENDING_TASK_TYPE_CHILD_WORKFLOW_initiated-id-1',
              pendingTaskType: PENDING_TASK_TYPE_CHILD_WORKFLOW,
              pendingTaskTypeDisplay: 'PendingChildWorkflowTask',
              runID: {
                routeLink: {
                  name: 'workflow/summary',
                  params: {
                    domain: 'samples-domain',
                    runId: 'run-id-1',
                    workflowId: 'workflow-id-1',
                  },
                },
                text: 'run-id-1',
              },
              workflowID: 'workflow-id-1',
            },
          ]);
        });
      }
    );

    describe(
      [
        'and getters[ROUTE_PARAMS_DOMAIN] returns "samples-domain" and ',
        'getters[WORKFLOW_PENDING_ACTIVE_FILTER] returns PENDING_TASK_FILTER_DECISIONS and ',
        'getters[WORKFLOW_EXECUTION_PENDING_DECISIONS] returns a pending decision list',
      ].join(''),
      () => {
        it('should return a mapped pending decision list.', () => {
          const getterFns = {
            ...workflowPendingGetterFns,
            [ROUTE_PARAMS_DOMAIN]: () => 'samples-domain',
            [WORKFLOW_PENDING_ACTIVE_FILTER]: () =>
              PENDING_TASK_FILTER_DECISIONS,
            [WORKFLOW_EXECUTION_PENDING_DECISIONS]: () => [
              {
                scheduledTimestamp: 'timestamp-1',
                pendingTaskType: PENDING_TASK_TYPE_DECISION,
              },
            ],
          };
          const getters = initGetters({ getterFns });
          const output = getters[WORKFLOW_PENDING_ACTIVE_PENDING_TASK_LIST];

          expect(output).toEqual([
            {
              scheduledTimestamp: 'timestamp-1',
              kvps: [
                {
                  key: 'scheduledTimestamp',
                  value: 'timestamp-1',
                },
              ],
              pendingTaskId: 'PENDING_TASK_TYPE_DECISION_timestamp-1',
              pendingTaskType: PENDING_TASK_TYPE_DECISION,
              pendingTaskTypeDisplay: 'PendingDecisionTask',
            },
          ]);
        });
      }
    );
  });
});
