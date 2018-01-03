describe('Intro page', function() {
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

  it('should go to the workflows of the domain requested when entered', async function() {
    var [testEl, scenario] = new Scenario(this.test).go(),
        domainInput = await testEl.waitUntilExists('.intro input')

    domainInput.value.should.be.empty
    domainInput.value = 'ci-tests'
    domainInput.trigger('input')
    domainInput.trigger('keydown', { code: 13, keyCode: 13, key: 'Enter' })

    var workflowsEl = await testEl.waitUntilExists('section.workflows'),
        headerBar = testEl.querySelector('header.top-bar')

    headerBar.should.have.descendant('nav')
    headerBar.should.have.descendant('div.domain').that.contains.text('ci-test')
    scenario.location.should.contain('/domain/ci-tests/workflows')
  })
})