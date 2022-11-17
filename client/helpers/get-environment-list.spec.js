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

import getEnvironmentList from './get-environment-list';

describe('getEnvironmentList', () => {
  it('should exclude the current environment from the list.', () => {
    const environmentList = [
      {
        value: 'https://production-environment.com',
      },
      {
        value: 'https://staging-environment.com',
      },
      {
        value: 'https://development-environment.com',
      },
    ];
    const origin = 'https://production-environment.com';
    const output = getEnvironmentList({ environmentList, origin });

    expect(output.length).toEqual(2);
    expect(output[0]).toEqual({
      value: 'https://staging-environment.com',
    });
    expect(output[1]).toEqual({
      value: 'https://development-environment.com',
    });
  });
});
