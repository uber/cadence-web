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

const Long = require('long');
const formatLongToTimestamp = require('./format-long-to-timestamp');

describe('formatLongToTimestamp', () => {
  it('converts a long to a timestamp', () => {
    const expectedTimestamp = {
      seconds: 1655151848,
      nanos: 301000000,
    };
    const dateString = '2022-06-13T20:24:08.301Z';
    const date = new Date(dateString);
    const dateLong = Long.fromValue(Number(date)).mul(1e6);
    const dateTimestamp = formatLongToTimestamp(dateLong);

    expect(dateTimestamp).toEqual(expectedTimestamp);

    // convert back to date string to verify
    const parsedDateMillis =
      dateTimestamp.seconds * 1e3 + Math.floor(dateTimestamp.nanos / 1e6);
    const parsedDate = new Date(parsedDateMillis);

    expect(parsedDate.toISOString()).toEqual(dateString);
  });
});
