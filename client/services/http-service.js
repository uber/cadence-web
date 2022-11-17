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

import { getQueryStringFromObject } from '~helpers';

const DEFAULT_FETCH_OPTIONS = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
  },
};

class HttpService {
  constructor() {
    this.origin = window.location.origin;
  }

  handleResponse(response) {
    return response.status >= 200 && response.status < 300
      ? response.json().catch(() => {})
      : response.json().then(
          json => Promise.reject(Object.assign(response, { json })),
          () => Promise.reject(response)
        );
  }

  async request(baseUrl, { query, ...options } = {}) {
    const { origin } = this;
    const fetch = this.fetchOverride ? this.fetchOverride : window.fetch;
    const queryString = getQueryStringFromObject(query);
    const path = queryString ? `${baseUrl}${queryString}` : baseUrl;
    const hasOrigin = baseUrl.startsWith('http');
    const url = hasOrigin ? path : `${origin}${path}`;
    const isCrossOrigin = !url.startsWith(window.location.origin);

    const requestOptions = {
      ...DEFAULT_FETCH_OPTIONS,
      ...options,
      ...(isCrossOrigin && {
        credentials: 'include',
        mode: 'cors',
      }),
    };

    return fetch(url, requestOptions).then(this.handleResponse);
  }

  requestWithBody(url, body, options = {}) {
    return this.request(url, {
      ...options,
      body: JSON.stringify(body),
      headers: {
        ...options.headers,
        ...(body && { 'Content-Type': 'application/json' }),
      },
    });
  }

  delete(url, body, options = {}) {
    return this.requestWithBody(url, body, {
      ...options,
      method: 'delete',
    });
  }

  get(url, options = {}) {
    return this.request(url, { ...options, method: 'get' });
  }

  post(url, body, options = {}) {
    return this.requestWithBody(url, body, {
      ...options,
      method: 'post',
    });
  }

  put(url, body, options = {}) {
    return this.requestWithBody(url, body, {
      ...options,
      method: 'put',
    });
  }

  setFetch(fetch) {
    this.fetchOverride = fetch;
  }

  setOrigin(origin) {
    this.origin = origin;
  }
}

const httpService = new HttpService();

export default httpService;
