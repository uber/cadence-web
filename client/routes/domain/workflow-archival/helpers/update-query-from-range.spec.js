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

import updateQueryFromRange from './update-query-from-range';

describe('updateQueryFromRange', () => {
  describe('When updatedRange = "last-30-days"', () => {
    it('should return range = "last-30-days".', () => {
      const updatedRange = 'last-30-days';
      const output = updateQueryFromRange({ updatedRange });

      expect(output.range).toEqual('last-30-days');
    });
  });

  describe('When updatedRange = { endTime: Date("2020-03-30T00:00:00.000Z"), startTime: Date("2020-03-01T00:00:00.000Z") }', () => {
    const updatedRange = {
      endTime: new Date('2020-03-30T00:00:00.000Z'),
      startTime: new Date('2020-03-01T00:00:00.000Z'),
    };

    it('should return endTime = "2020-03-30T00:00:00.000Z".', () => {
      const output = updateQueryFromRange({ updatedRange });

      expect(output.endTime).toEqual('2020-03-30T00:00:00.000Z');
    });

    it('should return startTime = "2020-03-01T00:00:00.000Z".', () => {
      const output = updateQueryFromRange({ updatedRange });

      expect(output.startTime).toEqual('2020-03-01T00:00:00.000Z');
    });
  });
});
