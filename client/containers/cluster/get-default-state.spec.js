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

describe('cluster getDefaultState', () => {
  describe('when state = undefined', () => {
    const state = undefined;

    it('should return the default state.', () => {
      const output = getDefaultState(state);

      expect(output).toEqual({
        data: null,
        error: null,
        expiryDateTime: null,
      });
    });
  });

  describe('when state = { data: {}, error: false, expiryDateTime: "2021-05-21T21:48:30.624Z" }', () => {
    const state = {
      data: {},
      error: false,
      expiryDateTime: '2021-05-21T21:48:30.624Z',
    };

    it('should return the state', () => {
      const output = getDefaultState(state);

      expect(output).toEqual({
        data: {},
        error: false,
        expiryDateTime: '2021-05-21T21:48:30.624Z',
      });
    });
  });
});
