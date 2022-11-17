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

import getStartTimeIsoString from './get-start-time-iso-string';

describe('getStartTimeIsoString', () => {
  describe('When range = undefined and startTimeString = "2020-03-30T00:00:00Z"', () => {
    it('should return "2020-03-30T00:00:00Z".', () => {
      const range = undefined;
      const startTimeString = '2020-03-30T00:00:00Z';
      const output = getStartTimeIsoString(range, startTimeString);

      expect(output).toEqual(startTimeString);
    });
  });

  describe('When moment is set to March 31th 2020 and range = "last-30-days"', () => {
    it('should return "2020-03-01T00:00:00.000Z".', () => {
      jest
        .spyOn(Date, 'now')
        .mockImplementation(() => new Date(Date.UTC(2020, 2, 31)).getTime());
      const range = 'last-30-days';
      const startTimeString = '';
      const output = getStartTimeIsoString(range, startTimeString);

      expect(output).toEqual('2020-03-01T00:00:00.000Z');
    });
  });
});
