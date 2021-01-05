// Copyright (c) 2017-2021 Uber Technologies Inc.
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

export default function http(fetch, url, o) {
  const opts = {
    credentials: 'same-origin',
    headers: {
      Accepts: 'application/json',
    },
    ...o,
  };
  let fetchUrl = url;

  if (opts.query) {
    const qs = Object.keys(opts.query)
      .filter(k => opts.query[k] != null)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(opts.query[k])}`)
      .join('&');

    if (qs) {
      fetchUrl = `${url}?${qs}`;
    }
  }

  return fetch(fetchUrl, opts).then(r =>
    r.status >= 200 && r.status < 300
      ? r.json().catch(() => {})
      : r.json().then(
          json => Promise.reject(Object.assign(r, { json })),
          () => Promise.reject(r)
        )
  );
}

http.post = function post(fetch, url, body) {
  return http(fetch, url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

http.global = http.bind(null, window.fetch);
http.global.post = http.post.bind(null, window.fetch);
