describe('Intro', function() {
  it('should provide links to learn about cadence', async function() {
    var testEl = new Scenario(this.test).render(),
        introEl = await testEl.waitUntilExists('section.intro')

    introEl.should.have.descendant('h1').with.text('Welcome to Cadence!')
    introEl.textNodes('a').should.deep.equal([
      'Introductory to Cadence Video',
      'Code Samples',
      'Source code on GitHub'
    ])
  })

  it('should show a header bar without a breadcrumb or domain changer', async function() {
    var testEl = new Scenario(this.test).render(),
        headerBar = await testEl.waitUntilExists('header.top-bar')

    headerBar.should.have.descendant('a h2').with.text('Cadence')
    headerBar.should.not.contain('nav').and.not.contain('div.domain')
  })

  it('should validate the existance of domains as the user types', async function () {
    var [testEl, scenario] = new Scenario(this.test).go(),
        domainNav = await testEl.waitUntilExists('.intro .domain-navigation'),
        domainInput = domainNav.querySelector('input')

    domainInput.value.should.be.empty
    domainNav.should.have.class('validation-unknown').and.not.have.class('.validation-valid')
    domainNav.should.not.have.descendant('ul.recent-domains')

    scenario.api.getOnce('/api/domain/ci-', 404)
    domainInput.input('ci-')

    await retry(() => domainNav.should.have.class('validation-invalid'))

    await Promise.delay(50)

    domainInput.trigger('keydown', { code: 13, keyCode: 13, key: 'Enter' })
    await Promise.delay(50)

    scenario.api.getOnce('/api/domain/ci-tests', 200)
    domainInput.input('ci-tests')

    await retry(() => domainNav.should.have.class('validation-valid'))
  })

  it('should go to the workflows of the domain requested when entered', async function() {
    var [testEl, scenario] = new Scenario(this.test).go(),
        domainInput = await testEl.waitUntilExists('.intro .domain-navigation input')

    scenario.api.getOnce('/api/domain/ci-tests', 200)
    domainInput.input('ci-tests')

    await testEl.waitUntilExists('.domain-navigation.validation-valid')
    scenario.withDomain('ci-tests').withWorkflows('open')
    domainInput.trigger('keydown', { code: 13, keyCode: 13, key: 'Enter' })

    var workflowsEl = await testEl.waitUntilExists('section.workflows'),
        headerBar = testEl.querySelector('header.top-bar')

    headerBar.should.have.descendant('nav')
    headerBar.should.have.descendant('div.domain').that.contains.text('ci-test')
    scenario.location.should.contain('/domain/ci-tests/workflows')
    localStorage.getItem('recent-domains').should.equal('["ci-tests"]')
  })

  it('should show recent domains with links to them', async function () {
    localStorage.setItem('recent-domains', JSON.stringify(['demo', 'ci-tests']))
    var [testEl, scenario] = new Scenario(this.test).go(),
        recentDomains = await testEl.waitUntilExists('.domain-navigation ul.recent-domains')

    recentDomains.should.have.descendant('h3').with.trimmed.text('Recent Domains')
    recentDomains.textNodes('li a').should.deep.equal(['demo', 'ci-tests'])

    recentDomains.querySelectorAll('li a')[1].trigger('click')
    scenario.withDomain('ci-tests').withWorkflows('open')

    await testEl.waitUntilExists('section.workflows')
    localStorage.getItem('recent-domains').should.equal('["ci-tests","demo"]')
  })
})