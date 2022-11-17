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
  FILTER_MODE_ADVANCED,
  FILTER_MODE_BASIC,
  STATE_CLOSED,
  STATE_OPEN,
} from '../constants';
import getFetchWorkflowListUrl from './get-fetch-workflow-list-url';

describe('getFetchWorkflowListUrl', () => {
  describe('domain = "samples-domain"', () => {
    const domain = 'samples-domain';

    describe('filterMode = FILTER_MODE_ADVANCED', () => {
      const filterMode = FILTER_MODE_ADVANCED;

      it('should return "/api/domains/samples-domain/workflows/list"', () => {
        const output = getFetchWorkflowListUrl({ domain, filterMode });

        expect(output).toEqual('/api/domains/samples-domain/workflows/list');
      });
    });

    describe('filterMode = FILTER_MODE_BASIC', () => {
      const filterMode = FILTER_MODE_BASIC;

      describe('state = STATE_CLOSED', () => {
        const state = STATE_CLOSED;

        it('should return "/api/domains/samples-domain/workflows/closed"', () => {
          const output = getFetchWorkflowListUrl({ domain, filterMode, state });

          expect(output).toEqual(
            '/api/domains/samples-domain/workflows/closed'
          );
        });
      });

      describe('state = STATE_OPEN', () => {
        const state = STATE_OPEN;

        it('should return "/api/domains/samples-domain/workflows/open"', () => {
          const output = getFetchWorkflowListUrl({ domain, filterMode, state });

          expect(output).toEqual('/api/domains/samples-domain/workflows/open');
        });
      });
    });
  });
});
