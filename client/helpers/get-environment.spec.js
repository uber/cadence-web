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

import getEnvironment from './get-environment';

describe('getEnvironment', () => {
  const LOCALHOST_DOMAIN = 'http://localhost:8088';
  const LOCALHOST_OPTION = {
    label: 'Localhost',
    value: LOCALHOST_DOMAIN,
  };

  const UNKNOWN_DOMAIN = 'http://unknown.domain.com';
  const UNKNOWN_OPTION = {
    label: 'Unknown',
    value: UNKNOWN_DOMAIN,
  };

  const ENVIRONMENT_LIST = [LOCALHOST_OPTION];

  it('should return UNKNOWN_OPTION when origin = UNKNOWN_DOMAIN and is not part of environmentList.', () => {
    const output = getEnvironment({
      environmentList: ENVIRONMENT_LIST,
      origin: UNKNOWN_DOMAIN,
    });

    expect(output).toEqual(UNKNOWN_OPTION);
  });

  it('should return LOCALHOST_OPTION when origin = LOCALHOST_DOMAIN and environmentList = [LOCALHOST_OPTION].', () => {
    const output = getEnvironment({
      environmentList: ENVIRONMENT_LIST,
      origin: LOCALHOST_DOMAIN,
    });

    expect(output).toEqual(LOCALHOST_OPTION);
  });
});
