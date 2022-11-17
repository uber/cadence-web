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

import {
  FILTER_BY_CLOSE_TIME,
  FILTER_BY_START_TIME,
  STATUS_ALL,
  STATUS_OPEN,
} from '../constants';

const getFilterBy = statusName =>
  [STATUS_ALL, STATUS_OPEN].includes(statusName)
    ? FILTER_BY_START_TIME
    : FILTER_BY_CLOSE_TIME;

export default getFilterBy;
