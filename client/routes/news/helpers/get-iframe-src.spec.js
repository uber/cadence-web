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

import getIFrameSrc from './get-iframe-src';

describe('getIFrameSrc', () => {
  const origin = 'http://cadence.com';

  it('should return "http://cadence.com/_news" when only origin is provided.', () => {
    const output = getIFrameSrc({ origin });

    expect(output).toEqual('http://cadence.com/_news');
  });

  it('should return "http://cadence.com/_news/2020/04/30/article-1" when article, date, month, origin, year are provided.', () => {
    const article = 'article-1';
    const date = '30';
    const month = '04';
    const year = '2020';
    const output = getIFrameSrc({ article, date, month, origin, year });

    expect(output).toEqual('http://cadence.com/_news/2020/04/30/article-1');
  });

  it('should return "http://cadence.com/_news/page/2" when navigating to page 2.', () => {
    const year = 'page';
    const month = '2';
    const output = getIFrameSrc({ month, origin, year });

    expect(output).toEqual('http://cadence.com/_news/page/2');
  });
});
