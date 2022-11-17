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

import httpService from './http-service';
import { getQueryStringFromObject } from '~helpers';

const URL_BASE = '/api/feature-flags/';

class FeatureFlagService {
  async isFeatureFlagEnabled({ name = '', params = {} }) {
    const queryParams = getQueryStringFromObject(params);
    const url = [URL_BASE, name, queryParams].join('');

    return (await httpService.get(url)).value;
  }

  getConfiguration(args) {
    return this.isFeatureFlagEnabled(args);
  }
}

const featureFlagService = new FeatureFlagService();

export default featureFlagService;
