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

import { FILTER_MODE_ADVANCED, FILTER_MODE_BASIC } from '../constants';
import getFilterModeButtonLabel from './get-filter-mode-button-label';

describe('getFilterModeButtonLabel', () => {
  describe('when called with "filterMode" = FILTER_MODE_ADVANCED', () => {
    const filterMode = FILTER_MODE_ADVANCED;

    it('should return FILTER_MODE_BASIC.', () => {
      const output = getFilterModeButtonLabel(filterMode);

      expect(output).toEqual(FILTER_MODE_BASIC);
    });
  });

  describe('when called with "filterMode" = FILTER_MODE_BASIC', () => {
    const filterMode = FILTER_MODE_BASIC;

    it('should return FILTER_MODE_ADVANCED.', () => {
      const output = getFilterModeButtonLabel(filterMode);

      expect(output).toEqual(FILTER_MODE_ADVANCED);
    });
  });

  describe('when called with "filterMode" = undefined', () => {
    const filterMode = undefined;

    it('should return FILTER_MODE_ADVANCED.', () => {
      const output = getFilterModeButtonLabel(filterMode);

      expect(output).toEqual(FILTER_MODE_ADVANCED);
    });
  });
});
