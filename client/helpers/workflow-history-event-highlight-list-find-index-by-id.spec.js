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

import findIndexById from './workflow-history-event-highlight-list-find-index-by-id';

describe('workflowHistoryEventHighlightListFindIndexById', () => {
  it('should return -1 if it cant find item in the list.', () => {
    const workflowHistoryEventHighlightList = [
      { id: 0 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
    ];

    const output = workflowHistoryEventHighlightList.findIndex(
      findIndexById({ id: 1 })
    );

    expect(output).toEqual(-1);
  });

  it('should return index = 1 when id = 1 and matching item with id = 1 is the second in the list.', () => {
    const workflowHistoryEventHighlightList = [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
    ];

    const output = workflowHistoryEventHighlightList.findIndex(
      findIndexById({ id: 1 })
    );

    expect(output).toEqual(1);
  });
});
