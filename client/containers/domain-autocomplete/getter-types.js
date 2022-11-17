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

import { typePrefix } from './helpers';

export const DOMAIN_AUTOCOMPLETE_COMBINED_DOMAIN_LIST = typePrefix(
  'COMBINED_DOMAIN_LIST'
);
export const DOMAIN_AUTOCOMPLETE_DOMAIN_LIST = typePrefix('DOMAIN_LIST');
export const DOMAIN_AUTOCOMPLETE_FILTERED_VISITED_DOMAIN_LIST = typePrefix(
  'FILTERED_VISITED_DOMAIN_LIST'
);
export const DOMAIN_AUTOCOMPLETE_IS_LOADING = typePrefix('IS_LOADING');
export const DOMAIN_AUTOCOMPLETE_NAVIGATE_TO_DOMAIN_URL = typePrefix(
  'NAVIGATE_TO_DOMAIN_URL'
);
export const DOMAIN_AUTOCOMPLETE_SEARCH = typePrefix('SEARCH');
export const DOMAIN_AUTOCOMPLETE_SEARCH_URL = typePrefix('SEARCH_URL');
export const DOMAIN_AUTOCOMPLETE_VISITED_DOMAIN_LIST = typePrefix(
  'VISITED_DOMAIN_LIST'
);
