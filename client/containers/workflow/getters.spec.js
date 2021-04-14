import { initGetters } from '~test';
import getterFns from './getters';
import {
  WORKFLOW_EXECUTION,
  WORKFLOW_EXECUTION_IS_LOADING,
  WORKFLOW_EXECUTION_PENDING_ACTIVITIES,
  WORKFLOW_EXECUTION_PENDING_CHILDREN,
  WORKFLOW_EXECUTION_PENDING_TASK_COUNT,
  WORKFLOW_EXECUTION_PENDING_TASKS,
  WORKFLOW_EXECUTION_TASK_LIST_NAME,
} from './getter-types';
import { PENDING_TASK_TYPE_ACTIVITY, PENDING_TASK_TYPE_CHILD_WORKFLOW } from './constants';

describe('workflow getters', () => {
  describe('when calling getters[WORKFLOW_EXECUTION]', () => {
    describe('and state.workflow.execution is defined', () => {
      const state = {
        workflow: {
          execution: {
            executionKey: 'executionValue',
          },
        },
      };

      it('should return the value from state.workflow.execution', () => {
        const getters = initGetters({ getterFns, state });
        const output = getters[WORKFLOW_EXECUTION];
        expect(output.executionKey).toEqual('executionValue');
      });
    });
  });

  describe('when calling getters[WORKFLOW_EXECUTION_IS_LOADING]', () => {
    describe('and state.workflow.isLoading = true', () => {
      const state = {
        workflow: {
          isLoading: true,
        },
      };

      it('should return true', () => {
        const getters = initGetters({ getterFns, state });
        const output = getters[WORKFLOW_EXECUTION_IS_LOADING];
        expect(output).toEqual(true);
      });
    });

    describe('and state.workfow.isLoading is not defined', () => {
      const state = {
        workflow: {},
      };

      it('should return false', () => {
        const getters = initGetters({ getterFns, state });
        const output = getters[WORKFLOW_EXECUTION_IS_LOADING];
        expect(output).toEqual(false);
      });
    });
  });

  describe('when calling getters[WORKFLOW_EXECUTION_PENDING_ACTIVITIES]', () => {
    describe('and state.workflow.execution.pendingActivities is defined', () => {
      const state = {
        workflow: {
          execution: {
            pendingActivities: [
              {
                activityKey: 'activityValue',
              }
            ],
          },
        },
      };

      it('should return the value from state.workflow.execution.pendingActivities with mapped pendingTaskType = PENDING_TASK_TYPE_ACTIVITY.', () => {
        const getters = initGetters({ getterFns, state });
        const output = getters[WORKFLOW_EXECUTION_PENDING_ACTIVITIES];

        expect(output[0].activityKey).toEqual('activityValue');
        expect(output[0].pendingTaskType).toEqual(PENDING_TASK_TYPE_ACTIVITY);
      });
    });

    describe('and state.workflow.execution.pendingActivities is not defined', () => {
      const state = {
        workflow: {},
      };

      it('should return an empty array.', () => {
        const getters = initGetters({ getterFns, state });
        const output = getters[WORKFLOW_EXECUTION_PENDING_ACTIVITIES];
        expect(output).toEqual([]);
      });
    });
  });


  describe('when calling getters[WORKFLOW_EXECUTION_PENDING_CHILDREN]', () => {
    describe('and state.workflow.execution.pendingChildren is defined', () => {
      const state = {
        workflow: {
          execution: {
            pendingChildren: [
              {
                childKey: 'childValue',
              }
            ],
          },
        },
      };

      it('should return the value from state.workflow.execution.pendingChildren with mapped pendingTaskType = PENDING_TASK_TYPE_CHILD_WORKFLOW.', () => {
        const getters = initGetters({ getterFns, state });
        const output = getters[WORKFLOW_EXECUTION_PENDING_CHILDREN];

        expect(output[0].childKey).toEqual('childValue');
        expect(output[0].pendingTaskType).toEqual(PENDING_TASK_TYPE_CHILD_WORKFLOW);
      });
    });

    describe('and state.workflow.execution.pendingChildren is not defined', () => {
      const state = {
        workflow: {},
      };

      it('should return an empty array.', () => {
        const getters = initGetters({ getterFns, state });
        const output = getters[WORKFLOW_EXECUTION_PENDING_CHILDREN];
        expect(output).toEqual([]);
      });
    });
  });

  describe('when calling getters[WORKFLOW_EXECUTION_PENDING_TASK_COUNT]', () => {
    describe('and state.workflow.execution.pendingActivities & pendingChildren are defined and has 1 item in each', () => {
      const state = {
        workflow: {
          execution: {
            pendingActivities: [
              {
                activityKey: 'activityValue',
              }
            ],
            pendingChildren: [
              {
                childKey: 'childValue',
              }
            ],
          },
        },
      };

      it('should return 2.', () => {
        const getters = initGetters({ getterFns, state });
        const output = getters[WORKFLOW_EXECUTION_PENDING_TASK_COUNT];

        expect(output).toEqual(2);
      });
    });

    describe('and state.workflow.execution.pendingActivities and pendingChildren are not defined', () => {
      const state = {
        workflow: {},
      };

      it('should return 0.', () => {
        const getters = initGetters({ getterFns, state });
        const output = getters[WORKFLOW_EXECUTION_PENDING_TASK_COUNT];

        expect(output).toEqual(0);
      });
    });
  });

  describe('when calling getters[WORKFLOW_EXECUTION_PENDING_TASKS]', () => {
    describe('and state.workflow.execution.pendingActivities & pendingChildren are defined and has 1 item in each', () => {
      const state = {
        workflow: {
          execution: {
            pendingActivities: [
              {
                activityKey: 'activityValue',
              }
            ],
            pendingChildren: [
              {
                childKey: 'childValue',
              }
            ],
          },
        },
      };

      it('should return both items.', () => {
        const getters = initGetters({ getterFns, state });
        const output = getters[WORKFLOW_EXECUTION_PENDING_TASKS];

        expect(output).toEqual([
          {
            activityKey: 'activityValue',
            pendingTaskType: PENDING_TASK_TYPE_ACTIVITY,
          },
          {
            childKey: 'childValue',
            pendingTaskType: PENDING_TASK_TYPE_CHILD_WORKFLOW,
          }
        ]);
      });
    });

    describe('and state.workflow.execution.pendingActivities and pendingChildren are not defined', () => {
      const state = {
        workflow: {},
      };

      it('should return empty array.', () => {
        const getters = initGetters({ getterFns, state });
        const output = getters[WORKFLOW_EXECUTION_PENDING_TASKS];

        expect(output).toEqual([]);
      });
    });
  });

  describe('when calling getters[WORKFLOW_EXECUTION_TASK_LIST_NAME]', () => {
    describe('and state.workflow.execution.executionConfiguration.taskList.name = "taskList"', () => {
      const state = {
        workflow: {
          execution: {
            executionConfiguration: {
              taskList: {
                name: 'taskList',
              },
            },
          },
        },
      };

      it('should return "taskList', () => {
        const getters = initGetters({ getterFns, state });
        const output = getters[WORKFLOW_EXECUTION_TASK_LIST_NAME];
        expect(output).toEqual('taskList');
      });
    });

    describe('and state.workflow.execution.executionConfiguration.taskList.name is not defined', () => {
      const state = {
        workflow: {},
      };

      it('should return ""', () => {
        const getters = initGetters({ getterFns, state });
        const output = getters[WORKFLOW_EXECUTION_TASK_LIST_NAME];
        expect(output).toEqual('');
      });
    });
  });
});
