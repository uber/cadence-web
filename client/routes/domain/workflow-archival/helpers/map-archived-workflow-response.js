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

import { getDatetimeFormattedString } from '~helpers';

export default ({ dateFormat, results, timeFormat, timezone }) =>
  !results
    ? []
    : results.map(
        ({
          closeStatus,
          closeTime,
          domainName,
          execution: { runId, workflowId },
          startTime,
          type: { name },
        }) => ({
          closeStatus,
          closeTime: getDatetimeFormattedString({
            date: closeTime,
            dateFormat,
            timeFormat,
            timezone,
          }),
          domainName,
          runId,
          startTime: getDatetimeFormattedString({
            date: startTime,
            dateFormat,
            timeFormat,
            timezone,
          }),
          workflowId,
          workflowName: name,
        })
      );
