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

export const CROSS_REGION_RESET_STATE = typePrefix('RESET_STATE');
export const CROSS_REGION_SET_ALLOWED_CROSS_ORIGIN = typePrefix(
  'SET_ALLOWED_CROSS_ORIGIN'
);
export const CROSS_REGION_SET_CLUSTER_ORIGIN_LIST = typePrefix(
  'SET_CLUSTER_ORIGIN_LIST'
);
export const CROSS_REGION_SET_CROSS_REGION = typePrefix('SET_CROSS_REGION');
export const CROSS_REGION_SET_IS_READY = typePrefix('SET_IS_READY');
