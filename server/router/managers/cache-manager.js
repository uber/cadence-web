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

class CacheManager {
  constructor(cacheTimeLimit) {
    if (!cacheTimeLimit) {
      throw new Error('CacheManager expects cacheTimeLimit to be passed.');
    }

    this.cache = null;
    this.cacheExpiryDateTime = null;
    this.cacheTimeLimit = cacheTimeLimit;
  }

  clearCache() {
    this.cache = null;
    this.cacheExpiryDateTime = null;
  }

  async get(fetchCallback) {
    const { cache, cacheExpiryDateTime } = this;

    if (cacheExpiryDateTime && Date.now() < cacheExpiryDateTime) {
      return cache;
    }

    const data = await fetchCallback();

    this.setCache(data);

    return data;
  }

  setCache(data) {
    const { cacheTimeLimit } = this;

    this.cache = data;
    this.cacheExpiryDateTime = Date.now() + cacheTimeLimit;
  }
}

module.exports = CacheManager;
