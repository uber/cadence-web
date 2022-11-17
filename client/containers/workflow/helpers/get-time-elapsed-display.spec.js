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
import getTimeElapsedDisplay from './get-time-elapsed-display';

describe('getTimeElapsedDisplay', () => {
  const DATE = '2020-01-01 00:00:00';
  const DATE_PLUS_ONE_HOUR = '2020-01-01 01:00:00';

  describe('When passed an event with no timestamp', () => {
    it('should return "".', () => {
      const event = {};
      const output = getTimeElapsedDisplay({ event });

      expect(output).toEqual('');
    });
  });

  describe('When passed an event with a timestamp and index = -1', () => {
    it('should return "".', () => {
      const event = {
        timestamp: moment(DATE),
      };
      const index = -1;
      const output = getTimeElapsedDisplay({ event, index });

      expect(output).toEqual('');
    });
  });

  describe('When passed an event with a timestamp and index = 0', () => {
    it('should return the date string.', () => {
      const event = {
        timestamp: moment(DATE),
      };
      const index = 0;
      const output = getTimeElapsedDisplay({ event, index });

      expect(output).toEqual('Jan 1, 2020 12:00:00 AM');
    });
  });

  describe('When passed an event with a timestamp and index = 1 and eventList', () => {
    it('should return the elapsed time between the first event and the second.', () => {
      const eventList = [
        {
          timestamp: moment(DATE),
        },
        {
          timestamp: moment(DATE_PLUS_ONE_HOUR),
        },
      ];
      const index = 1;
      const event = eventList[index];
      const output = getTimeElapsedDisplay({ event, eventList, index });

      expect(output).toEqual('1h (+1h)');
    });
  });
});
