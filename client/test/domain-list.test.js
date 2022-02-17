// Copyright (c) 2017-2022 Uber Technologies Inc.
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

describe('Domain list', () => {
  async function domainListTest(mochaTest) {
    const [testEl, scenario] = new Scenario(mochaTest)
      .withFeatureFlags()
      .withNewsFeed()
      .go();

    return [testEl, scenario];
  }

  async function domainListToWorkflowListTest(mochaTest) {
    const [testEl, scenario] = new Scenario(mochaTest)
      .withCluster()
      .withDomain('ci-tests')
      .withDomainDescription('ci-tests') // once for domain-navigation
      .withDomainDescription('ci-tests') // once for workflow-list screen
      .withFeatureFlags()
      .withNewsFeed()
      .withWorkflows({ status: 'open' })
      .withWorkflows({ status: 'closed', startTimeOffset: 30 })
      .go();

    return [testEl, scenario];
  }

  it('should show a header bar without a breadcrumb or domain changer', async function test() {
    const [testEl] = await domainListTest(this.test);

    const headerBar = await testEl.waitUntilExists('header.top-bar');

    headerBar.should.have
      .descendant('a.logo svg')
      .and.have.descendant('text')
      .with.text('adence');
    headerBar.should.not.contain('nav').and.not.contain('div.domain');
  });

  it('should validate the existance of domains as the user types', async function test() {
    const [testEl, scenario] = await domainListTest(this.test);

    const domainNav = await testEl.waitUntilExists(
      'section.domain-search .domain-navigation'
    );
    const domainInput = domainNav.querySelector('input');

    domainInput.value.should.be.empty;
    domainNav.should.have
      .class('validation-unknown')
      .and.not.have.class('.validation-valid');
    domainNav.should.not.have.descendant('ul.recent-domains');

    scenario.api.getOnce('/api/domains/ci-', 404);
    domainInput.input('ci-');

    await retry(() => domainNav.should.have.class('validation-invalid'));

    await Promise.delay(50);

    domainInput.trigger('keydown', { code: 13, keyCode: 13, key: 'Enter' });
    await Promise.delay(50);

    scenario.withDomainDescription('ci-tests');
    domainInput.input('ci-tests');

    await retry(() => domainNav.should.have.class('validation-valid'));
  });

  it('should render the details of a valid domain', async function test() {
    const [testEl, scenario] = await domainListTest(this.test);

    const domainInput = await testEl.waitUntilExists(
      'section.domain-search .domain-navigation input'
    );

    scenario.withDomainDescription('ci-tests');
    domainInput.input('ci-tests');

    const descriptionEl = await testEl.waitUntilExists(
      'section.domain-search .domain-description'
    );

    descriptionEl.should.have
      .descendant('span.domain-name')
      .with.text('ci-tests');
    descriptionEl
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
    descriptionEl
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

  it('should go to the workflows of the domain requested when entered', async function test() {
    const [testEl, scenario] = await domainListToWorkflowListTest(this.test);

    const domainInput = await testEl.waitUntilExists(
      'section.domain-search .domain-navigation input'
    );

    domainInput.input('ci-tests');

    await testEl.waitUntilExists('.domain-navigation.validation-valid');

    domainInput.trigger('keydown', { code: 13, keyCode: 13, key: 'Enter' });

    await testEl.waitUntilExists('section.workflow-list.ready');
    const headerBar = testEl.querySelector('header.top-bar');

    headerBar.should.have
      .descendant('.workflows')
      .that.contains.text('ci-test');
    scenario.location.should.contain('/domains/ci-tests/workflows');
    localStorage.getItem('recent-domains').should.equal('["ci-tests"]');
  });

  it('should activate the change-domain button when the domain is valid and navigate to it', async function test() {
    const [testEl, scenario] = await domainListToWorkflowListTest(this.test);

    const domainNav = await testEl.waitUntilExists(
      'section.domain-search .domain-navigation'
    );
    const domainInput = domainNav.querySelector('input');
    const changeDomain = domainNav.querySelector('a.change-domain');

    changeDomain.should.have.attr('href', '');
    scenario.api.getOnce('/api/domains/ci-', 404);
    domainInput.input('ci-');

    await retry(() => domainNav.should.have.class('validation-invalid'));
    changeDomain.should.have.attr('href', '');

    await Promise.delay(50);

    domainInput.input('ci-tests');

    await testEl.waitUntilExists('.domain-navigation.validation-valid');
    changeDomain.should.have.attr('href', '#');
    changeDomain.trigger('click');

    await testEl.waitUntilExists('section.workflow-list.ready');
    const headerBar = testEl.querySelector('header.top-bar');

    headerBar.should.have
      .descendant('.workflows')
      .that.contains.text('ci-test');
    scenario.location.should.contain('/domains/ci-tests/workflows');
    localStorage.getItem('recent-domains').should.equal('["ci-tests"]');

    await Promise.delay(100);
  });

  it('should show recent domains with links to them', async function test() {
    localStorage.setItem(
      'recent-domains',
      JSON.stringify(['demo', 'ci-tests'])
    );

    const [testEl] = await domainListToWorkflowListTest(this.test);

    const recentDomains = await testEl.waitUntilExists(
      '.domain-navigation ul.recent-domains'
    );

    recentDomains.should.have
      .descendant('h3')
      .with.trimmed.text('Recent Domains');
    recentDomains.textNodes('li a').should.deep.equal(['demo', 'ci-tests']);

    recentDomains.querySelectorAll('li a')[1].trigger('click');

    await testEl.waitUntilExists('section.workflow-list.ready');
    localStorage.getItem('recent-domains').should.equal('["ci-tests","demo"]');
  });

  it('should show a description of recent domains when hovered', async function test() {
    localStorage.setItem(
      'recent-domains',
      JSON.stringify(['demo', 'ci-tests'])
    );

    const [testEl, scenario] = await domainListTest(this.test);

    const recentDomains = await testEl.waitUntilExists(
      '.domain-navigation ul.recent-domains'
    );

    scenario.withDomainDescription('demo', {
      domainInfo: { description: 'demo playground' },
      configuration: { workflowExecutionRetentionPeriodInDays: 3 },
    });
    recentDomains.querySelectorAll('li a')[0].trigger('mouseover');

    const descriptionEl = await testEl.waitUntilExists(
      'section.domain-search .domain-description'
    );

    descriptionEl
      .textNodes('dl.details dd')
      .should.deep.equal([
        'demo playground',
        'ci-test@uber.com',
        'No',
        '3 days',
        'Yes',
        'Enabled',
        'Disabled',
        '0',
        'ci-test-cluster (active)',
      ]);
  });
});
