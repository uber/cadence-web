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

const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
const STATE_TO_FILTER_BY_MAP = {
  all: 'StartTime',
  closed: 'CloseTime',
  open: 'StartTime',
};

module.exports = {
  ONE_HOUR_IN_MILLISECONDS,
  STATE_TO_FILTER_BY_MAP,
};
