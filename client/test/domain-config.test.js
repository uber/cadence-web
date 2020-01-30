describe('Domain Configuration', () => {
  async function domainConfigTest(mochaTest, desc) {
    const [testEl, scenario] = new Scenario(mochaTest)
      .withDomain('ci-test')
      .startingAt('/domain/ci-test/config')
      .withDomainDescription('ci-test', desc)
      .go();

    const configEl = await testEl.waitUntilExists('section.domain-config');

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
        '0',
        'ci-test-cluster (active)',
      ]);
  });
});
