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

import getDefaultState from './get-default-state';

describe('workflow history getDefaultState', () => {
  describe('when state is not passed', () => {
    it('should return graphEnabled = true', () => {
      const output = getDefaultState();

      expect(output.graphEnabled).toEqual(true);
    });
  });

  describe('when state is passed and has graphEnabled = false', () => {
    const state = {
      graphEnabled: false,
    };

    it('should return graphEnabled = false', () => {
      const output = getDefaultState(state);

      expect(output.graphEnabled).toEqual(false);
    });
  });
});
