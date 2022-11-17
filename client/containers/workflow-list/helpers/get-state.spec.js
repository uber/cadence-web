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

import {
  STATE_ALL,
  STATE_CLOSED,
  STATE_OPEN,
  STATUS_ALL,
  STATUS_CLOSED,
  STATUS_COMPLETED,
  STATUS_OPEN,
} from '../constants';
import getState from './get-state';

describe('getState', () => {
  describe('when statusName = ""', () => {
    const statusName = '';

    it('should return STATE_ALL.', () => {
      const output = getState(statusName);

      expect(output).toEqual(STATE_ALL);
    });
  });

  describe('when statusName = STATUS_ALL', () => {
    const statusName = STATUS_ALL;

    it('should return STATE_ALL.', () => {
      const output = getState(statusName);

      expect(output).toEqual(STATE_ALL);
    });
  });

  describe('when statusName = STATUS_OPEN', () => {
    const statusName = STATUS_OPEN;

    it('should return STATE_OPEN.', () => {
      const output = getState(statusName);

      expect(output).toEqual(STATE_OPEN);
    });
  });

  describe('when statusName = STATUS_CLOSED', () => {
    const statusName = STATUS_CLOSED;

    it('should return STATE_CLOSED.', () => {
      const output = getState(statusName);

      expect(output).toEqual(STATE_CLOSED);
    });
  });

  describe('when statusName = STATUS_COMPLETED', () => {
    const statusName = STATUS_COMPLETED;

    it('should return STATE_CLOSED.', () => {
      const output = getState(statusName);

      expect(output).toEqual(STATE_CLOSED);
    });
  });
});
