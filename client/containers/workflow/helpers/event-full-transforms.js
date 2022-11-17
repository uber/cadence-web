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

import { WORKFLOW_EVENT_TYPE } from '~constants';

export const eventFullTransforms = {
  [WORKFLOW_EVENT_TYPE.MarkerRecorded]: d => {
    if (d.markerName === 'SideEffect') {
      if (!Array.isArray(d.details)) {
        // Java client
        return {
          data: d.details,
          decisionTaskCompletedEventId: d.decisionTaskCompletedEventId,
        };
      }

      // Go client
      return {
        sideEffectID: d.details[0],
        data: JSON.tryParse(atob(d.details[1])) || d.details[1],
        decisionTaskCompletedEventId: d.decisionTaskCompletedEventId,
      };
    }

    return d;
  },
};
