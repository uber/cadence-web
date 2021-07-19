// Copyright (c) 2017-2021 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

describe('Domain search', () => {
  it('should show a header bar without a breadcrumb or domain changer', async function test() {
    const [testEl] = new Scenario(this.test)
      .withFeatureFlags()
      .withEmptyNewsFeed()
      .go();

    const headerBar = await testEl.waitUntilExists('header.top-bar');

    headerBar.should.have
      .descendant('a.logo svg')
      .and.have.descendant('text')
      .with.text('adence');
    headerBar.should.not.contain('nav').and.not.contain('div.domain');
  });

  it('should show a list of domains when the user types', async function() {
    const [testEl] = new Scenario(this.test)
      .withFeatureFlags()
      .withEmptyNewsFeed()
      .withDomainSearch()
      .go();

    const domainInput = await testEl.waitUntilExists(
      'section.domain-search .domain-autocomplete input'
    );

    domainInput.trigger('focus');
    domainInput.input('ci-tests');

    // wait for debounce & request to finish
    await Promise.delay(200);

    const domainAutocompleteList = await testEl.waitUntilExists(
      'section.domain-search .domain-autocomplete ul.vs__dropdown-menu'
    );

    const domainListItem = domainAutocompleteList.querySelector('li');

    domainListItem.should.have.trimmed.text('ci-tests - Local - primary');
  });

  it('should go to the workflows of the domain requested when selected', async function test() {
    const [testEl, scenario] = new Scenario(this.test)
      .withCluster()
      .withDomain('ci-tests')
      .withDomainDescription('ci-tests')
      .withDomainSearch()
      .withEmptyNewsFeed()
      .withFeatureFlags()
      .withWorkflows({ status: 'open' })
      .withWorkflows({ status: 'closed', startTimeOffset: 30 })
      .go();

    const domainInput = await testEl.waitUntilExists(
      'section.domain-search .domain-autocomplete input'
    );

    domainInput.trigger('focus');
    domainInput.input('ci-tests');

    // wait for debounce & request to finish
    await Promise.delay(200);

    const domainAutocompleteList = await testEl.waitUntilExists(
      'section.domain-search .domain-autocomplete ul.vs__dropdown-menu'
    );

    const domainListItem = domainAutocompleteList.querySelector('li');

    domainListItem.trigger('mousedown');

    await testEl.waitUntilExists('section.workflow-list');
    const headerBar = testEl.querySelector('header.top-bar');

    headerBar.should.have
      .descendant('.workflows')
      .that.contains.text('ci-test');
    scenario.location.should.contain('/domains/ci-tests/workflows');
  });

  it('should enable the change-domain button when a domain is typed and navigate to it when clicked', async function test() {
    const [testEl, scenario] = new Scenario(this.test)
      .withCluster()
      .withDomain('ci-tests')
      .withDomainDescription('ci-tests')
      .withDomainSearch()
      .withEmptyNewsFeed()
      .withFeatureFlags()
      .withWorkflows({ status: 'open' })
      .withWorkflows({ status: 'closed', startTimeOffset: 30 })
      .go();

    const domainNav = await testEl.waitUntilExists(
      'section.domain-search .domain-autocomplete'
    );
    const domainInput = domainNav.querySelector('input');

    domainInput.trigger('focus');
    domainInput.input('ci-tests');

    const changeDomain = await testEl.waitUntilExists('a.navigate-to-domain');

    changeDomain.should.have.attr('href', '/domains/ci-tests');
    changeDomain.trigger('click');

    await testEl.waitUntilExists('section.workflow-list');
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
    const [testEl, scenario] = new Scenario(this.test)
      .withCluster()
      .withDomain('ci-tests')
      .withDomainDescription('ci-tests')
      .withDomainSearch()
      .withEmptyNewsFeed()
      .withFeatureFlags()
      .withWorkflows({ status: 'open' })
      .withWorkflows({ status: 'closed', startTimeOffset: 30 })
      .go();

    const domainInput = await testEl.waitUntilExists(
      'section.domain-search .domain-autocomplete input'
    );

    domainInput.trigger('focus');

    const recentDomains = await testEl.waitUntilExists(
      'section.domain-search .domain-autocomplete ul.vs__dropdown-menu'
    );

    recentDomains.textNodes('li').should.deep.equal(['ci-tests', 'demo']);

    recentDomains.querySelectorAll('li')[0].trigger('mousedown');

    await testEl.waitUntilExists('section.workflow-list');
    scenario.location.should.contain('/domains/ci-tests/workflows');

    // Note: delay needed otherwise test leaks into other tests.
    await Promise.delay(500);
  });
});
