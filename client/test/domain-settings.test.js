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

describe('Domain Settings', () => {
  async function domainConfigTest(mochaTest, desc) {
    const [testEl, scenario] = new Scenario(mochaTest)
      .withDomain('ci-test')
      .startingAt('/domains/ci-test/settings')
      .withFeatureFlags()
      .withEmptyNewsFeed()
      .withDomainDescription('ci-test', desc)
      .go();

    const configEl = await testEl.waitUntilExists('section.domain-settings');

    return [configEl, scenario];
  }

  it('should show properties in a readable form from the domain description API', async function test() {
    const [configEl] = await domainConfigTest(this.test);

    await configEl.waitUntilExists('dl.details dt');
    configEl.should.have.descendant('header h3').with.text('ci-test');
    configEl
      .textNodes('dl.details dt')
      .should.deep.equal([
        'description',
        'owner',
        'Global?',
        'Retention Period',
        'Emit Metrics',
        'History Archival',
        'Visibility Archival',
        'Failover Version',
        'clusters',
      ]);
    configEl
      .textNodes('dl.details dd')
      .should.deep.equal([
        'A cool domain',
        'ci-test@uber.com',
        'No',
        '21 days',
        'Yes',
        'Enabled',
        'Disabled',
        '0',
        'ci-test-cluster (active)',
      ]);
  });
});
