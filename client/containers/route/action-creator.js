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

import { ROUTE_PUSH, ROUTE_REPLACE, ROUTE_UPDATE_QUERY } from './action-types';
import { ROUTE_QUERY } from './getter-types';
import { getUpdatedQuery } from './helpers';

const actionCreator = router => ({
  [ROUTE_PUSH]: (_, args) => router.push(args),
  [ROUTE_REPLACE]: (_, args) => router.replace(args),
  [ROUTE_UPDATE_QUERY]: ({ getters }, payload) => {
    const updatedQuery = getUpdatedQuery({
      payload,
      query: getters[ROUTE_QUERY],
    });

    if (updatedQuery) {
      router.replace({
        query: updatedQuery,
      });
    }
  },
});

export default actionCreator;
