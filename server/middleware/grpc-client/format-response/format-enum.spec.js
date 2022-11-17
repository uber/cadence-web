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

import formatEnum from './format-enum';

describe('formatEnum', () => {
  it('should return null when enum contains INVALID', () => {
    const input = ['CONTAINS_INVALID'];
    const output = formatEnum(input[0]);

    expect(output).toEqual(null);
  });

  it('should format enum by removing prefix and converts to snake case (by default)', () => {
    const input = ['PREFIX_ENUM_SNAKE_VALUE', 'PREFIX_ENUM'];
    const output = formatEnum(...input);

    expect(output).toEqual('SNAKE_VALUE');
  });

  it('should format enum by removing prefix and convert to pascal case when caseFormat is pascal.', () => {
    const input = ['PREFIX_ENUM_PASCAL_VALUE', 'PREFIX_ENUM', 'pascal'];
    const output = formatEnum(...input);

    expect(output).toEqual('PascalValue');
  });
});
