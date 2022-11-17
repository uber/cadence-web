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

const isRangeValid = ({ minStartDate, now, range }) => {
  if (typeof range === 'string') {
    const [, count, unit] = range.split('-');
    let startTime;

    try {
      startTime = moment(now)
        .subtract(count, unit)
        .startOf(unit);
    } catch (e) {
      return false;
    }

    if (minStartDate && startTime < minStartDate) {
      return false;
    }

    return true;
  }

  if (range.startTime && range.endTime) {
    const startTime = moment(range.startTime);
    const endTime = moment(range.endTime);

    if (startTime > endTime) {
      return false;
    }

    if (minStartDate && startTime < minStartDate) {
      return false;
    }

    return true;
  }

  return false;
};

export default isRangeValid;
