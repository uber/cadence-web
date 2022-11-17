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

export const CROSS_REGION = 'CROSS_REGION';
export const CROSS_REGION_ALLOWED_CROSS_ORIGIN = typePrefix(
  'ALLOWED_CROSS_ORIGIN'
);
export const CROSS_REGION_CLUSTER_ORIGIN_LIST = typePrefix(
  'CLUSTER_ORIGIN_LIST'
);
export const CROSS_REGION_IS_LOADING = typePrefix('IS_LOADING');
export const CROSS_REGION_IS_READY = typePrefix('IS_READY');
