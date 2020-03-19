describe('Help', () => {
  async function helpTest(mochaTest) {
    const [testEl, scenario] = new Scenario(mochaTest)
      .startingAt('/help')
      .go();

    const helpEl = await testEl.waitUntilExists('section.help');

    return [helpEl, scenario];
  }

  it('should provide links to learn about cadence', async function test() {
    const [helpEl] = await helpTest(this.test);
    const linksEl = await helpEl.waitUntilExists('section#getting-started');

    linksEl.should.have.descendant('h1').with.text('Welcome to Cadence!');
    linksEl
      .textNodes('a')
      .should.deep.equal([
        'Getting started',
        'Docs',
        'Code Samples',
        'Cadence source code on GitHub',
        'Cadence UI source code on GitHub',
      ]);
  });

  it('should provide links to release notes', async function test() {
    const [helpEl] = await helpTest(this.test);
    const linksEl = await helpEl.waitUntilExists('section#release-notes');

    linksEl
      .textNodes('a')
      .should.deep.equal([
        'Latest release notes',
        'Cadence',
        'Cadence UI',
      ]);
  });

  it('should provide commands under common CLI commands', async function test() {
    const [helpEl] = await helpTest(this.test);
    const linksEl = await helpEl.waitUntilExists('section#cli');

    linksEl
      .textNodes('pre')
      .should.deep.equal([
        "cadence workflow 1",
        "cadence workflow 2",
      ]);
  });

  it('should provide links to contact cadence team', async function test() {
    const [helpEl] = await helpTest(this.test);
    const linksEl = await helpEl.waitUntilExists('section#contact-us');

    linksEl
      .textNodes('a')
      .should.deep.equal([
        'Contact us',
        'Ask a question on Stack Overflow',
        'Join our discussion group',
        'Join our slack channel',
      ]);
  });
});