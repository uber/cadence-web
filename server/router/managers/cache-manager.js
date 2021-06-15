// Copyright (c) 2021 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

const { ONE_HOUR_IN_MILLISECONDS } = require('../constants');

class CacheManager {
  constructor(cacheTimeLimit = ONE_HOUR_IN_MILLISECONDS) {
    this.cache = null;
    this.cacheExpiryDateTime = null;
    this.cacheTimeLimit = cacheTimeLimit;
  }

  clearCache() {
    this.cache = null;
    this.cacheExpiryDateTime = null;
  }

  async get(fetchCallback) {
    const { cache, cacheExpiryDateTime, setCache } = this;

    if (cacheExpiryDateTime && Date.now() < cacheExpiryDateTime) {
      return cache;
    }

    const data = await fetchCallback();

    setCache(data);

    return data;
  }

  setCache(data) {
    const { cacheTimeLimit } = this;

    this.cache = data;
    this.cacheExpiryDateTime = Date.now() + cacheTimeLimit;
  }
}

module.exports = CacheManager;
