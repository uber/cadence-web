describe('Intro', () => {
  it('should provide links to learn about cadence', async function test() {
    const testEl = new Scenario(this.test).render();
    const linksEl = await testEl.waitUntilExists('section.intro .links');

    linksEl.should.have.descendant('h1').with.text('Welcome to Cadence!');
    linksEl
      .textNodes('a')
      .should.deep.equal([
        'Introductory to Cadence Video',
        'Code Samples',
        'Source code on GitHub',
      ]);
  });

  it('should show a header bar without a breadcrumb or domain changer', async function test() {
    const testEl = new Scenario(this.test).render();
    const headerBar = await testEl.waitUntilExists('header.top-bar');

    headerBar.should.have
      .descendant('a.logo svg')
      .and.have.descendant('text')
      .with.text('adence');
    headerBar.should.not.contain('nav').and.not.contain('div.domain');
  });

  it('should validate the existance of domains as the user types', async function test() {
    const [testEl, scenario] = new Scenario(this.test).go();
    const domainNav = await testEl.waitUntilExists('.intro .domain-navigation');
    const domainInput = domainNav.querySelector('input');

    domainInput.value.should.be.empty;
    domainNav.should.have
      .class('validation-unknown')
      .and.not.have.class('.validation-valid');
    domainNav.should.not.have.descendant('ul.recent-domains');

    scenario.api.getOnce('/api/domain/ci-', 404);
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
    const [testEl, scenario] = new Scenario(this.test).go();
    const domainInput = await testEl.waitUntilExists(
      '.intro .domain-navigation input'
    );

    scenario.withDomainDescription('ci-tests');
    domainInput.input('ci-tests');

    const descriptionEl = await testEl.waitUntilExists(
      '.intro .domain-description'
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
        '0',
        'ci-test-cluster (active)',
      ]);
  });

  it('should go to the workflows of the domain requested when entered', async function test() {
    const [testEl, scenario] = new Scenario(this.test).go();
    const domainInput = await testEl.waitUntilExists(
      '.intro .domain-navigation input'
    );

    scenario.withDomainDescription('ci-tests');
    domainInput.input('ci-tests');

    await testEl.waitUntilExists('.domain-navigation.validation-valid');
    scenario
      .withDomain('ci-tests')
      .withWorkflows('open')
      .withDomainDescription('ci-tests');
    domainInput.trigger('keydown', { code: 13, keyCode: 13, key: 'Enter' });

    await testEl.waitUntilExists('section.workflows');
    const headerBar = testEl.querySelector('header.top-bar');

    headerBar.should.have
      .descendant('div.domain')
      .that.contains.text('ci-test');
    scenario.location.should.contain('/domain/ci-tests/workflows');
    localStorage.getItem('recent-domains').should.equal('["ci-tests"]');
  });

  it('should activate the change-domain button when the domain is valid and navigate to it', async function test() {
    const [testEl, scenario] = new Scenario(this.test).go();
    const domainNav = await testEl.waitUntilExists('.intro .domain-navigation');
    const domainInput = domainNav.querySelector('input');
    const changeDomain = domainNav.querySelector('a.change-domain');

    changeDomain.should.have.attr('href', '');
    scenario.api.getOnce('/api/domain/ci-', 404);
    domainInput.input('ci-');

    await retry(() => domainNav.should.have.class('validation-invalid'));
    changeDomain.should.have.attr('href', '');

    await Promise.delay(50);

    scenario.withDomainDescription('ci-tests');
    domainInput.input('ci-tests');

    await testEl.waitUntilExists('.domain-navigation.validation-valid');
    changeDomain.should.have.attr('href', '#');
    scenario
      .withDomain('ci-tests')
      .withDomainDescription('ci-tests')
      .withWorkflows('open');
    changeDomain.trigger('click');

    await testEl.waitUntilExists('section.workflows');
    const headerBar = testEl.querySelector('header.top-bar');

    headerBar.should.have
      .descendant('div.domain')
      .that.contains.text('ci-test');
    scenario.location.should.contain('/domain/ci-tests/workflows');
    localStorage.getItem('recent-domains').should.equal('["ci-tests"]');

    await Promise.delay(100);
  });

  it('should show recent domains with links to them', async function test() {
    localStorage.setItem(
      'recent-domains',
      JSON.stringify(['demo', 'ci-tests'])
    );
    const [testEl, scenario] = new Scenario(this.test).go();
    const recentDomains = await testEl.waitUntilExists(
      '.domain-navigation ul.recent-domains'
    );

    recentDomains.should.have
      .descendant('h3')
      .with.trimmed.text('Recent Domains');
    recentDomains.textNodes('li a').should.deep.equal(['demo', 'ci-tests']);

    recentDomains.querySelectorAll('li a')[1].trigger('click');
    scenario
      .withDomain('ci-tests')
      .withDomainDescription('ci-tests')
      .withWorkflows('open');

    await testEl.waitUntilExists('section.workflows');
    localStorage.getItem('recent-domains').should.equal('["ci-tests","demo"]');
  });

  it('should show a description of recent domains when hovered', async function test() {
    localStorage.setItem(
      'recent-domains',
      JSON.stringify(['demo', 'ci-tests'])
    );
    const [testEl, scenario] = new Scenario(this.test).go();
    const recentDomains = await testEl.waitUntilExists(
      '.domain-navigation ul.recent-domains'
    );

    scenario.withDomainDescription('demo', {
      domainInfo: { description: 'demo playground' },
      configuration: { workflowExecutionRetentionPeriodInDays: 3 },
    });
    recentDomains.querySelectorAll('li a')[0].trigger('mouseover');

    const descriptionEl = await testEl.waitUntilExists(
      '.intro .domain-description'
    );

    descriptionEl
      .textNodes('dl.details dd')
      .should.deep.equal([
        'demo playground',
        'ci-test@uber.com',
        'No',
        '3 days',
        'Yes',
        '0',
        'ci-test-cluster (active)',
      ]);
  });
});
