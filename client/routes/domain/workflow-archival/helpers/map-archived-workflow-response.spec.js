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

import mapArchivedWorkflowResponse from './map-archived-workflow-response';

describe('mapArchivedWorkflowResponse', () => {
  it('should return a flattened results array when passed executions with 1 item', () => {
    const results = [
      {
        closeStatus: 'closeStatusValue',
        closeTime: '2020-03-30T00:00:00Z',
        execution: {
          runId: 'runIdValue',
          workflowId: 'workflowIdValue',
        },
        startTime: '2020-03-01T00:00:00Z',
        type: {
          name: 'workflowNameValue',
        },
      },
    ];
    const output = mapArchivedWorkflowResponse({ results });

    expect(output[0].closeStatus).toEqual('closeStatusValue');
    expect(output[0].closeTime).toEqual('Mar 30, 2020 12:00:00 AM');
    expect(output[0].runId).toEqual('runIdValue');
    expect(output[0].startTime).toEqual('Mar 1, 2020 12:00:00 AM');
    expect(output[0].workflowId).toEqual('workflowIdValue');
    expect(output[0].workflowName).toEqual('workflowNameValue');
  });
});
