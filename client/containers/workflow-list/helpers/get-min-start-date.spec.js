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

import { STATUS_ALL, STATUS_CLOSED, STATUS_OPEN } from '../constants';
import getMinStartDate from './get-min-start-date';

describe('getMinStartDate', () => {
  describe('when statusName = STATUS_OPEN', () => {
    const statusName = STATUS_OPEN;

    it('should return null.', () => {
      const output = getMinStartDate({ statusName });

      expect(output).toEqual(null);
    });
  });

  describe('when statusName = STATUS_ALL', () => {
    const statusName = STATUS_ALL;

    it('should return null.', () => {
      const output = getMinStartDate({ statusName });

      expect(output).toEqual(null);
    });
  });

  describe('when statusName = STATUS_CLOSED and maxRetentionDays = 3', () => {
    const maxRetentionDays = 3;
    const statusName = STATUS_CLOSED;

    it('should return a date 3 days before now.', () => {
      const now = new Date(2021, 4, 4); // month is 0 based. 4 = may
      const output = getMinStartDate({ maxRetentionDays, now, statusName });

      expect(output.toISOString()).toEqual('2021-05-01T00:00:00.000Z');
    });
  });
});
