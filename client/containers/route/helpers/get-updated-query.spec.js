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

import getUpdatedQuery from './get-updated-query';

describe('route helpers getUpdatedQuery', () => {
  describe('when getUpdatedQuery is called with a param in payload that is an empty string', () => {
    const query = {
      omittedQuery: 'previous-query-value',
    };

    const payload = {
      omittedQuery: '',
    };

    it('should omit that entry from the returned updated query.', () => {
      const output = getUpdatedQuery({ payload, query });

      expect(output.omittedQuery).toEqual(undefined);
    });
  });

  describe('when getUpdatedQuery is called with a payload which does not change the query', () => {
    const query = {
      key: 'value',
      key2: 'value2',
    };

    const payload = {
      key: 'value',
    };

    it('should return null.', () => {
      const output = getUpdatedQuery({ payload, query });

      expect(output).toEqual(null);
    });
  });
});
