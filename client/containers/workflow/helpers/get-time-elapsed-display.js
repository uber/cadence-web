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
import { getDatetimeFormattedString } from '~helpers';

const getTimeElapsedDisplay = ({
  dateFormat,
  event: { timestamp = null },
  eventList,
  index,
  timeFormat,
  timezone,
}) => {
  if (!timestamp || index === -1) {
    return '';
  }

  if (index === 0) {
    return getDatetimeFormattedString({
      date: timestamp,
      dateFormat,
      timeFormat,
      timezone,
    });
  }

  const deltaFromPrev = moment.duration(
    timestamp - eventList[index - 1].timestamp
  );
  let elapsed = moment.duration(timestamp - eventList[0].timestamp).format();

  if (deltaFromPrev.asSeconds() >= 1) {
    elapsed += ` (+${deltaFromPrev.format()})`;
  }

  return elapsed;
};

export default getTimeElapsedDisplay;
