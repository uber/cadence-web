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

const isAdvancedVisibilityEnabled = require('./is-advanced-visibility-enabled');

describe('isAdvancedVisibilityEnabled', () => {
  describe('cluster = null', () => {
    const cluster = null;

    it('should return false.', () => {
      const output = isAdvancedVisibilityEnabled(cluster);

      expect(output).toEqual(false);
    });
  });

  describe('cluster.persistenceInfo.visibilityStore.features["advancedVisibilityEnabled"].enabled = false', () => {
    const cluster = {
      persistenceInfo: {
        visibilityStore: {
          features: [
            {
              key: 'advancedVisibilityEnabled',
              enabled: false,
            },
          ],
        },
      },
    };

    it('should return false.', () => {
      const output = isAdvancedVisibilityEnabled(cluster);

      expect(output).toEqual(false);
    });
  });

  describe('cluster.persistenceInfo.visibilityStore.features["advancedVisibilityEnabled"].enabled = true', () => {
    const cluster = {
      persistenceInfo: {
        visibilityStore: {
          features: [
            {
              key: 'advancedVisibilityEnabled',
              enabled: true,
            },
          ],
        },
      },
    };

    it('should return true.', () => {
      const output = isAdvancedVisibilityEnabled(cluster);

      expect(output).toEqual(true);
    });
  });
});
