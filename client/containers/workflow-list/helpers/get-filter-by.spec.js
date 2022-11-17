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
  FILTER_BY_CLOSE_TIME,
  FILTER_BY_START_TIME,
  STATUS_ALL,
  STATUS_CLOSED,
  STATUS_OPEN,
} from '../constants';
import getFilterBy from './get-filter-by';

describe('getFilterBy', () => {
  describe('statusName = STATUS_ALL', () => {
    const statusName = STATUS_ALL;

    it('should return FILTER_BY_START_TIME.', () => {
      const output = getFilterBy(statusName);

      expect(output).toEqual(FILTER_BY_START_TIME);
    });
  });

  describe('statusName = STATUS_OPEN', () => {
    const statusName = STATUS_OPEN;

    it('should return FILTER_BY_START_TIME.', () => {
      const output = getFilterBy(statusName);

      expect(output).toEqual(FILTER_BY_START_TIME);
    });
  });

  describe('statusName = STATUS_CLOSED', () => {
    const statusName = STATUS_CLOSED;

    it('should return FILTER_BY_CLOSE_TIME.', () => {
      const output = getFilterBy(statusName);

      expect(output).toEqual(FILTER_BY_CLOSE_TIME);
    });
  });
});
