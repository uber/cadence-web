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

import getStringElipsis from './get-string-elipsis';
import { MAXIMUM_JSON_CHARACTER_LIMIT, MAXIMUM_JSON_MESSAGE } from '~constants';

describe('getStringElipsis', () => {
  describe('when passed a string that has a length less than MAXIMUM_JSON_CHARACTER_LIMIT', () => {
    it('should return the original string', () => {
      const input = 'a-short-string';
      const output = getStringElipsis(input);

      expect(output).toEqual('a-short-string');
    });
  });
  describe('when passed a string that has a length equal to MAXIMUM_JSON_CHARACTER_LIMIT', () => {
    it('should return a substring of the original string up until the limit and display a message.', () => {
      const input = ''.padEnd(MAXIMUM_JSON_CHARACTER_LIMIT, '_');
      const output = getStringElipsis(input);

      expect(output).toEqual(input + MAXIMUM_JSON_MESSAGE);
    });
  });
});
