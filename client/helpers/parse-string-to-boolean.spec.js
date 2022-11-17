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

import parseStringToBoolean from './parse-string-to-boolean';

describe('parseStringToBoolean', () => {
  it('should return true when passed value = "true".', () => {
    const output = parseStringToBoolean('true');

    expect(output).toEqual(true);
  });

  it('should return false when passed value = "false".', () => {
    const output = parseStringToBoolean('false');

    expect(output).toEqual(false);
  });

  it('should return false when nothing is passed.', () => {
    const output = parseStringToBoolean();

    expect(output).toEqual(false);
  });

  it('should return true when passed value = null and defaultValue = true.', () => {
    const output = parseStringToBoolean(null, true);

    expect(output).toEqual(true);
  });
});
