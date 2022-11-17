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

const DOMAIN_LIST_DELAY_MS = 100;
const DOMAIN_LIST_PAGE_SIZE = 100;
const DOMAIN_LIST_RETRY_MAX = 3;
const DOMAIN_LIST_SEARCH_SIZE = 10;
const DOMAIN_STATUS_REGISTERED = 'REGISTERED';

module.exports = {
  DOMAIN_LIST_DELAY_MS,
  DOMAIN_LIST_PAGE_SIZE,
  DOMAIN_LIST_RETRY_MAX,
  DOMAIN_LIST_SEARCH_SIZE,
  DOMAIN_STATUS_REGISTERED,
};
