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

import { STATUS_OPEN } from '../constants';
import { getDatetimeFormattedString } from '~helpers';

const getFormattedResults = ({
  clusterName,
  dateFormat,
  results,
  timeFormat,
  timezone,
}) =>
  results.map(result => {
    const status = (result.closeStatus || STATUS_OPEN).toLowerCase();

    return {
      clusterName,
      domainName: result.domainName,
      endTime: result.closeTime
        ? getDatetimeFormattedString({
            date: result.closeTime,
            dateFormat,
            timeFormat,
            timezone,
          })
        : '',
      runId: result.execution.runId,
      startTime: getDatetimeFormattedString({
        date: result.startTime,
        dateFormat,
        timeFormat,
        timezone,
      }),
      status,
      uniqueId: `${result.execution.runId}-${status}`,
      workflowId: result.execution.workflowId,
      workflowName: result.type.name,
    };
  });

export default getFormattedResults;
