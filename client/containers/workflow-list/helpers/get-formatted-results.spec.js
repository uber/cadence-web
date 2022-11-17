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

import { STATUS_COMPLETED } from '../constants';
import getFormattedResults from './get-formatted-results';
import {
  DATE_FORMAT_YYYY_MM_DD,
  DATE_FORMAT_MMM_D_YYYY,
  TIME_FORMAT_12,
  TIME_FORMAT_24,
  TIMEZONE_LOCAL,
  TIMEZONE_UTC,
} from '~constants';

describe('getFormattedResults', () => {
  const resultWithoutCloseStatus = {
    execution: {
      runId: 'run_id_5678',
      workflowId: 'wf_id_1234',
    },
    startTime: '2021-05-15T07:00:00.000Z',
    type: {
      name: 'wf_name',
    },
  };

  const resultWithCloseStatus = {
    ...resultWithoutCloseStatus,
    closeTime: '2021-05-19T06:59:59.999Z',
    closeStatus: STATUS_COMPLETED,
  };

  describe('results = [resultWithoutCloseStatus], dateFormat = DATE_FORMAT_YYYY_MM_DD, timeFormat = TIME_FORMAT_12 and timezone = TIMEZONE_LOCAL', () => {
    const results = [resultWithoutCloseStatus];
    const dateFormat = DATE_FORMAT_YYYY_MM_DD;
    const timeFormat = TIME_FORMAT_12;
    const timezone = TIMEZONE_LOCAL;

    it('should format the results with the specified formats for startTime and endTime = "".', () => {
      const output = getFormattedResults({
        dateFormat,
        results,
        timeFormat,
        timezone,
      });

      expect(output).toEqual([
        {
          endTime: '',
          runId: 'run_id_5678',
          startTime: '2021-05-15 7:00:00 AM',
          status: 'open',
          uniqueId: 'run_id_5678-open',
          workflowId: 'wf_id_1234',
          workflowName: 'wf_name',
        },
      ]);
    });
  });

  describe('results = [resultWithCloseStatus], dateFormat = DATE_FORMAT_MMM_D_YYYY, timeFormat = TIME_FORMAT_24 and timezone = TIMEZONE_UTC', () => {
    const results = [resultWithCloseStatus];
    const dateFormat = DATE_FORMAT_MMM_D_YYYY;
    const timeFormat = TIME_FORMAT_24;
    const timezone = TIMEZONE_UTC;

    it('should format the results with the specified formats for startTime and endTime.', () => {
      const output = getFormattedResults({
        dateFormat,
        results,
        timeFormat,
        timezone,
      });

      expect(output).toEqual([
        {
          endTime: 'May 19, 2021 06:59:59',
          runId: 'run_id_5678',
          startTime: 'May 15, 2021 07:00:00',
          status: 'completed',
          uniqueId: 'run_id_5678-completed',
          workflowId: 'wf_id_1234',
          workflowName: 'wf_name',
        },
      ]);
    });
  });
});
