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
import getExpiryDateTimeFromNow from './get-expiry-date-time-from-now';

describe('getExpiryDateTimeFromNow', () => {
  beforeEach(() => {
    MockDate.set(new Date('2020-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('should return a date 1 hour in the future', () => {
    const output = getExpiryDateTimeFromNow();

    expect(output).toEqual('2020-01-01T01:00:00.000Z');
  });
});
