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

const getQueryStringFromObject = (params = {}) => {
  const paramKeys = Object.keys(params);

  if (paramKeys.length === 0) {
    return '';
  }

  return (
    '?' +
    paramKeys
      .filter(
        queryName =>
          params[queryName] !== null && params[queryName] !== undefined
      )
      .map(
        queryName =>
          encodeURIComponent(queryName) +
          '=' +
          encodeURIComponent(params[queryName])
      )
      .join('&')
  );
};

export default getQueryStringFromObject;
