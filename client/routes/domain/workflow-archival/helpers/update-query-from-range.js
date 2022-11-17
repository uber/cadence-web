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

export default ({
  query: { endTime, startTime, range, ...query } = {},
  updatedRange,
}) => {
  if (typeof updatedRange === 'string') {
    query.range = updatedRange;
  } else if (
    typeof updatedRange === 'object' &&
    updatedRange.endTime &&
    updatedRange.startTime
  ) {
    query.endTime = updatedRange.endTime.toISOString();
    query.startTime = updatedRange.startTime.toISOString();
  }

  return query;
};
