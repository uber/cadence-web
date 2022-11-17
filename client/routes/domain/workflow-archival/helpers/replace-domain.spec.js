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

import replaceDomain from './replace-domain';

describe('replaceDomain', () => {
  describe('When message = "message containing {domain}" and domainSettings.domainInfo.name = "DomainName"', () => {
    it('should return "message containing DomainName".', () => {
      const message = 'message containing {domain}';
      const domainSettings = {
        domainInfo: {
          name: 'DomainName',
        },
      };

      const output = replaceDomain(message, domainSettings);

      expect(output).toEqual('message containing DomainName');
    });
  });
});
