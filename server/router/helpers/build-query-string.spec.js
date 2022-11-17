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

const moment = require('moment');
const buildQueryString = require('./build-query-string');

describe('buildQueryString', () => {
  describe('when passed startTime, endTime', () => {
    let startTime;
    let endTime;

    beforeEach(() => {
      startTime = moment('2021-06-03T00:00:00.000Z');
      endTime = moment('2021-06-04T00:00:00.000Z');
    });

    it('should return "CloseTime >= "2021-06-03T00:00:00.000Z" and CloseTime <= "2021-06-04T00:00:00.000Z"".', () => {
      const output = buildQueryString(startTime, endTime);

      expect(output).toEqual(
        'CloseTime >= "2021-06-03T00:00:00.000Z" and CloseTime <= "2021-06-04T00:00:00.000Z"'
      );
    });

    describe('isCron = true', () => {
      const isCron = true;

      it('should return "CloseTime >= "2021-06-03T00:00:00.000Z" and CloseTime <= "2021-06-04T00:00:00.000Z" and IsCron = "true"".', () => {
        const output = buildQueryString(startTime, endTime, { isCron });

        expect(output).toEqual(
          'CloseTime >= "2021-06-03T00:00:00.000Z" and CloseTime <= "2021-06-04T00:00:00.000Z" and IsCron = "true"'
        );
      });
    });

    describe('isCron = false', () => {
      const isCron = false;

      it('should return "CloseTime >= "2021-06-03T00:00:00.000Z" and CloseTime <= "2021-06-04T00:00:00.000Z" and IsCron = "false"".', () => {
        const output = buildQueryString(startTime, endTime, { isCron });

        expect(output).toEqual(
          'CloseTime >= "2021-06-03T00:00:00.000Z" and CloseTime <= "2021-06-04T00:00:00.000Z" and IsCron = "false"'
        );
      });
    });

    describe('state = "all"', () => {
      const state = 'all';

      it('should return "StartTime >= "2021-06-03T00:00:00.000Z" and StartTime <= "2021-06-04T00:00:00.000Z"".', () => {
        const output = buildQueryString(startTime, endTime, { state });

        expect(output).toEqual(
          'StartTime >= "2021-06-03T00:00:00.000Z" and StartTime <= "2021-06-04T00:00:00.000Z"'
        );
      });
    });

    describe('state = "closed"', () => {
      const state = 'closed';

      it('should return "CloseTime >= "2021-06-03T00:00:00.000Z" and CloseTime <= "2021-06-04T00:00:00.000Z"".', () => {
        const output = buildQueryString(startTime, endTime, { state });

        expect(output).toEqual(
          'CloseTime >= "2021-06-03T00:00:00.000Z" and CloseTime <= "2021-06-04T00:00:00.000Z"'
        );
      });
    });

    describe('state = "open"', () => {
      const state = 'open';

      it('should return "StartTime >= "2021-06-03T00:00:00.000Z" and StartTime <= "2021-06-04T00:00:00.000Z" and CloseTime = missing".', () => {
        const output = buildQueryString(startTime, endTime, { state });

        expect(output).toEqual(
          'StartTime >= "2021-06-03T00:00:00.000Z" and StartTime <= "2021-06-04T00:00:00.000Z" and CloseTime = missing'
        );
      });
    });

    describe('status = "Completed"', () => {
      const status = 'Completed';

      it('should return "CloseTime >= "2021-06-03T00:00:00.000Z" and CloseTime <= "2021-06-04T00:00:00.000Z" and CloseStatus = "Completed"".', () => {
        const output = buildQueryString(startTime, endTime, { status });

        expect(output).toEqual(
          'CloseTime >= "2021-06-03T00:00:00.000Z" and CloseTime <= "2021-06-04T00:00:00.000Z" and CloseStatus = "Completed"'
        );
      });
    });

    describe('workflowId = "wf-id"', () => {
      const workflowId = 'wf-id';

      it('should return "CloseTime >= "2021-06-03T00:00:00.000Z" and CloseTime <= "2021-06-04T00:00:00.000Z" and WorkflowID = "wf-id"".', () => {
        const output = buildQueryString(startTime, endTime, { workflowId });

        expect(output).toEqual(
          'CloseTime >= "2021-06-03T00:00:00.000Z" and CloseTime <= "2021-06-04T00:00:00.000Z" and WorkflowID = "wf-id"'
        );
      });
    });

    describe('workflowName = "wf-name"', () => {
      const workflowName = 'wf-name';

      it('should return "CloseTime >= "2021-06-03T00:00:00.000Z" and CloseTime <= "2021-06-04T00:00:00.000Z" and WorkflowType = "wf-name"".', () => {
        const output = buildQueryString(startTime, endTime, { workflowName });

        expect(output).toEqual(
          'CloseTime >= "2021-06-03T00:00:00.000Z" and CloseTime <= "2021-06-04T00:00:00.000Z" and WorkflowType = "wf-name"'
        );
      });
    });
  });
});
