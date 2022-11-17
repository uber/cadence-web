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

describe('Domain search', () => {
  async function domainSearchTest(mochaTest) {
    const [testEl, scenario] = new Scenario(mochaTest)
      .withDomainSearch()
      .withEmptyNewsFeed()
      .withFeatureFlags()
      .go();

    return [testEl, scenario];
  }

  async function domainSearchToWorkflowListTest(mochaTest) {
    const [testEl, scenario] = new Scenario(mochaTest)
      .withCluster()
      .withDomain('ci-tests')
      .withDomainDescription('ci-tests') // once for domain-navigation
      .withDomainDescription('ci-tests') // once for workflow-list screen
      .withDomainSearch()
      .withEmptyNewsFeed()
      .withFeatureFlags()
      .withWorkflows({ status: 'open' })
      .withWorkflows({ status: 'closed', startTimeOffset: 30 })
      .go();

    return [testEl, scenario];
  }

  it('should show a header bar without a breadcrumb or domain changer', async function test() {
    const [testEl] = await domainSearchTest(this.test);

    const headerBar = await testEl.waitUntilExists('header.top-bar');

    headerBar.should.have
      .descendant('a.logo svg')
      .and.have.descendant('text')
      .with.text('adence');
    headerBar.should.not.contain('nav').and.not.contain('div.domain');
  });

  it('should show a list of domains when the user types', async function() {
    const [testEl] = await domainSearchTest(this.test);

    const domainInput = await testEl.waitUntilExists(
      'section.domain-search .domain-autocomplete input'
    );

    domainInput.trigger('focus');
    domainInput.input('ci-tests');

    await testEl.waitUntilExists('section.domain-search .autocomplete.loading');
    await testEl.waitUntilExists('section.domain-search .autocomplete.ready');

    const domainAutocompleteList = await testEl.waitUntilExists(
      'section.domain-search .domain-autocomplete ul.vs__dropdown-menu'
    );

    const domainListItem = domainAutocompleteList.querySelector('li');

    domainListItem.should.have.trimmed.text('ci-tests - Local - primary');
  });

  it('should go to the workflows of the domain requested when selected', async function test() {
    const [testEl, scenario] = await domainSearchToWorkflowListTest(this.test);

    const domainInput = await testEl.waitUntilExists(
      'section.domain-search .domain-autocomplete input'
    );

    domainInput.trigger('focus');
    domainInput.input('ci-tests');

    await testEl.waitUntilExists('section.domain-search .autocomplete.loading');
    await testEl.waitUntilExists('section.domain-search .autocomplete.ready');

    const domainAutocompleteList = await testEl.waitUntilExists(
      'section.domain-search .domain-autocomplete ul.vs__dropdown-menu'
    );

    const domainListItem = domainAutocompleteList.querySelector('li');

    domainListItem.click();

    await testEl.waitUntilExists('section.workflow-list.ready');
    const headerBar = testEl.querySelector('header.top-bar');

    headerBar.should.have
      .descendant('.workflows')
      .that.contains.text('ci-test');
    scenario.location.should.contain('/domains/ci-tests/workflows');
  });

  it('should enable the change-domain button when a domain is typed and navigate to it when clicked', async function test() {
    const [testEl, scenario] = await domainSearchToWorkflowListTest(this.test);

    const domainNav = await testEl.waitUntilExists(
      'section.domain-search .domain-autocomplete'
    );
    const domainInput = domainNav.querySelector('input');

    domainInput.trigger('focus');
    domainInput.input('ci-tests');

    await testEl.waitUntilExists('section.domain-search .autocomplete.loading');
    await testEl.waitUntilExists('section.domain-search .autocomplete.ready');

    const changeDomain = await testEl.waitUntilExists('a.navigate-to-domain');

    changeDomain.should.have.attr('href', '/domains/ci-tests');
    changeDomain.trigger('click');

    await testEl.waitUntilExists('section.workflow-list.ready');
    const headerBar = testEl.querySelector('header.top-bar');

    headerBar.should.have
      .descendant('.workflows')
      .that.contains.text('ci-test');
    scenario.location.should.contain('/domains/ci-tests/workflows');
  });

  it('should show recent domains with links to them', async function test() {
    localStorage.setItem(
      'recent-domains',
      JSON.stringify(['ci-tests', 'demo'])
    );
    const [testEl, scenario] = await domainSearchToWorkflowListTest(this.test);

    const domainInput = await testEl.waitUntilExists(
      'section.domain-search .domain-autocomplete input'
    );

    domainInput.trigger('focus');

    const recentDomains = await testEl.waitUntilExists(
      'section.domain-search .domain-autocomplete ul.vs__dropdown-menu'
    );

    recentDomains.textNodes('li').should.deep.equal(['ci-tests', 'demo']);

    recentDomains.querySelectorAll('li')[0].click();

    await testEl.waitUntilExists('section.workflow-list.ready');
    scenario.location.should.contain('/domains/ci-tests/workflows');
  });
});
