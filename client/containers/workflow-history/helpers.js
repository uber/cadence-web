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
  DEFAULT_SPLIT_SIZE_DAG,
  DEFAULT_SPLIT_SIZE_TIMELINE,
  DEFAULT_SPLIT_SIZE_NONE,
  GRAPH_VIEW_DAG,
  GRAPH_VIEW_TIMELINE,
} from './constants';

export const getDefaultSplitSize = ({ graphView }) => {
  switch (graphView) {
    case GRAPH_VIEW_DAG:
      return DEFAULT_SPLIT_SIZE_DAG;
    case GRAPH_VIEW_TIMELINE:
      return DEFAULT_SPLIT_SIZE_TIMELINE;
    default:
      return DEFAULT_SPLIT_SIZE_NONE;
  }
};
