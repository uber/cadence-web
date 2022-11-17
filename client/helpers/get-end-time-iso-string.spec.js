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

import getEndTimeIsoString from './get-end-time-iso-string';

describe('getEndTimeIsoString', () => {
  describe('When range = undefined', () => {
    it('should return endTimeString.', () => {
      const range = undefined;
      const endTimeString = '2020-03-30T00:00:00Z';
      const output = getEndTimeIsoString(range, endTimeString);

      expect(output).toEqual(endTimeString);
    });
  });

  describe('When moment is set to March 1st 2020 and range = "last-30-days"', () => {
    it('should return "2020-03-01T23:59:59.999Z".', () => {
      jest
        .spyOn(Date, 'now')
        .mockImplementation(() => new Date(Date.UTC(2020, 2, 1)).getTime());
      const range = 'last-30-days';
      const endTimeString = '';
      const output = getEndTimeIsoString(range, endTimeString);

      expect(output).toEqual('2020-03-01T23:59:59.999Z');
    });
  });
});
