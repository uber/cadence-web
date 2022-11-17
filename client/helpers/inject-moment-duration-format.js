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

import moment from 'moment';

const injectMomentDurationFormat = () => {
  Object.getPrototypeOf(
    moment.duration(2, 'seconds')
  ).format = function format() {
    return this.toString()
      .toLowerCase()
      .replace(/[pt]/g, '')
      .replace(/([hmd])/g, '$1 ')
      .replace(/\.\d{1,3}s/, 's')
      .replace('0d ', '')
      .trim();
  };
};

export default injectMomentDurationFormat;
