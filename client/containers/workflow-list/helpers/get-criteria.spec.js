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

import {
  FILTER_MODE_ADVANCED,
  FILTER_MODE_BASIC,
  STATUS_CLOSED,
} from '../constants';
import getCriteria from './get-criteria';

describe('getCriteria', () => {
  describe('when startTime = null and endTime = "2021-05-19T06:59:59.999Z"', () => {
    const endTime = '2021-05-19T06:59:59.999Z';
    const startTime = null;

    it('should return null.', () => {
      const output = getCriteria({ endTime, startTime });

      expect(output).toEqual(null);
    });
  });

  describe('when endTime = null and startTime = "2021-05-15T07:00:00.000Z"', () => {
    const endTime = null;
    const startTime = '2021-05-15T07:00:00.000Z';

    it('should return null.', () => {
      const output = getCriteria({ endTime, startTime });

      expect(output).toEqual(null);
    });
  });

  describe('when startTime = "2021-05-15T07:00:00.000Z", endTime = "2021-05-19T06:59:59.999Z",', () => {
    const endTime = '2021-05-19T06:59:59.999Z';
    const startTime = '2021-05-15T07:00:00.000Z';

    describe('filterMode = FILTER_MODE_ADVANCED and queryString = " WorkflowID = 1234 "', () => {
      const filterMode = FILTER_MODE_ADVANCED;
      const queryString = ' WorkflowID = 1234 ';

      it('should return { queryString: "WorkflowID = 1234" }.', () => {
        const output = getCriteria({
          endTime,
          filterMode,
          queryString,
          startTime,
        });

        expect(output).toEqual({ queryString: 'WorkflowID = 1234' });
      });
    });

    describe('filterMode = FILTER_MODE_BASIC, status = STATUS_CLOSED', () => {
      const filterMode = FILTER_MODE_BASIC;
      const status = STATUS_CLOSED;

      it('should return an object with only these fields. workflowId and workflowName keys should not be defined on the object.', () => {
        const output = getCriteria({ endTime, filterMode, startTime, status });

        expect(output).toEqual({
          endTime,
          startTime,
          status,
        });
      });

      describe(', workflowId = " 1234 " and workflowName = " workflow-name "', () => {
        const workflowId = ' 1234 ';
        const workflowName = ' workflow-name ';

        it('should return an object with these fields plus workflowId and workflowName are trimmed.', () => {
          const output = getCriteria({
            endTime,
            filterMode,
            startTime,
            status,
            workflowId,
            workflowName,
          });

          expect(output).toEqual({
            endTime,
            startTime,
            status,
            workflowId: '1234',
            workflowName: 'workflow-name',
          });
        });
      });
    });
  });
});
