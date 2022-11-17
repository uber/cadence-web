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

import isEqual from 'lodash.isequal';

// omits entries from payload with empty string to be removed from original URL query params
// if query and updated query are equal, it will return null.
const getUpdatedQuery = ({ payload, query }) => {
  const omittedKeys = [];
  const omittedPayload = Object.entries(payload).reduce(
    (accumulator, [key, value]) => {
      if (value === '') {
        omittedKeys.push(key);

        return accumulator;
      }

      accumulator[key] = value;

      return accumulator;
    },
    {}
  );

  const omittedQuery = Object.entries(query).reduce(
    (accumulator, [key, value]) => {
      if (omittedKeys.includes(key)) {
        return accumulator;
      }

      accumulator[key] = value;

      return accumulator;
    },
    {}
  );

  const updatedQuery = {
    ...omittedQuery,
    ...omittedPayload,
  };

  if (isEqual(query, updatedQuery)) {
    return null;
  }

  return updatedQuery;
};

export default getUpdatedQuery;
