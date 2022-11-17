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

import isHistoryArchivalEnabled from './is-history-archival-enabled';

describe('isHistoryArchivalEnabled', () => {
  describe('When domainSettings is not defined', () => {
    it('should return false.', () => {
      const domainSettings = undefined;
      const output = isHistoryArchivalEnabled(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When domainSettings.configuration.historyArchivalStatus = "DISABLED"', () => {
    it('should return false.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalStatus: 'DISABLED',
        },
      };
      const output = isHistoryArchivalEnabled(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When domainSettings.configuration.historyArchivalStatus = "ENABLED"', () => {
    it('should return true.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalStatus: 'ENABLED',
        },
      };
      const output = isHistoryArchivalEnabled(domainSettings);

      expect(output).toEqual(true);
    });
  });
});
