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

import remove from './workflow-history-event-highlight-list-remove';

describe('workflowHistoryEventHighlightListRemove', () => {
  it('list is unchanged when no item with id = 1 in list and passed id = 1.', () => {
    const workflowHistoryEventHighlightList = [
      { id: 0 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
    ];

    const output = remove({
      id: 1,
      workflowHistoryEventHighlightList,
    });

    expect(output).toEqual(workflowHistoryEventHighlightList);
  });

  it('removes item with id = 1 from list when passed id = 1.', () => {
    const workflowHistoryEventHighlightList = [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
    ];

    const output = remove({
      id: 1,
      workflowHistoryEventHighlightList,
    });

    expect(output).toEqual([{ id: 0 }, { id: 2 }, { id: 3 }, { id: 4 }]);
  });
});
