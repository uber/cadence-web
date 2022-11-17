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

import MockDate from 'mockdate';
import hasExpired from './has-expired';

describe('hasExpired', () => {
  beforeEach(() => {
    MockDate.set(new Date('2020-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    MockDate.reset();
  });

  describe('when expiryDateTime is not passed', () => {
    it('should return true.', () => {
      const output = hasExpired();

      expect(output).toEqual(true);
    });
  });

  describe('when expiryDateTime is in the past', () => {
    it('should return true.', () => {
      const output = hasExpired(new Date('2019-12-30T00:00:00.000Z'));

      expect(output).toEqual(true);
    });
  });

  describe('when expiryDateTime is in the future', () => {
    it('should return false.', () => {
      const output = hasExpired(new Date('2020-01-01T01:00:00.000Z'));

      expect(output).toEqual(false);
    });
  });
});
