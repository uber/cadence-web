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

import { getQueryStringFromObject } from '~helpers';

const DEFAULT_FETCH_OPTIONS = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
  },
};

class HttpService {
  handleResponse(response) {
    return response.status >= 200 && response.status < 300
      ? response.json().catch(() => {})
      : response.json().then(
          json => Promise.reject(Object.assign(response, { json })),
          () => Promise.reject(response)
        );
  }

  async request(baseUrl, { query, ...options } = {}) {
    const fetch = this.fetchOverride ? this.fetchOverride : window.fetch;
    const queryString = getQueryStringFromObject(query);
    const url = queryString ? `${baseUrl}${queryString}` : baseUrl;
    const isCrossOrigin = baseUrl.startsWith('http');

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
        'Content-Type': 'application/json',
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
}

const httpService = new HttpService();

export default httpService;
