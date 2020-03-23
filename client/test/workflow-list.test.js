import moment from 'moment';
import fixtures from './fixtures';

describe('Workflow list', () => {
  async function workflowsTest(mochaTest, initialWorkflows, query, domainDesc) {
    const [testEl, scenario] = new Scenario(mochaTest)
      .withDomain('ci-test')
      .startingAt('/domains/ci-test/workflows')
      .withWorkflows('open', query, initialWorkflows)
      .withDomainDescription('ci-test', domainDesc)
      .go();

    const workflows = await testEl.waitUntilExists('section.workflow-list');

    return [workflows, scenario];
  }

  const demoWf = [
    {
      execution: {
        workflowId: 'demoWfId',
        runId: 'demoRunId',
      },
      type: { name: 'demo' },
    },
  ];

  it('should show the domain with configuration link and workflows breadcrumb in the nav bar', async function test() {
    const [, scenario] = await workflowsTest(this.test);
    const header = scenario.vm.$el.querySelector('header.top-bar');

    header.should.have
      .descendant('a.workflows')
      .and.have.class('router-link-active')
      .and.have.attribute('href', '/domains/ci-test/workflows');

    header.should.have
      .descendant('a.config')
      .and.not.have.class('router-link-active')
      .and.have.attribute('href', 'domain/ci-test/config');
  });

  it('should query for open workflows and show the results in a grid', async function test() {
    const [workflowsEl] = await workflowsTest(this.test);
    const resultsEl = workflowsEl.querySelector('section.results');

    workflowsEl
      .querySelector('div.status .selected-tag')
      .should.contain.text('Open');

    await resultsEl.waitUntilExists('tbody tr:nth-child(2)');

    resultsEl
      .textNodes('th')
      .should.deep.equal([
        'Workflow ID',
        'Run ID',
        'Name',
        'Status',
        'Start Time',
        'End Time',
      ]);

    resultsEl
      .textNodes('tbody td:first-child')
      .should.deep.equal([
        'github.com/uber/cadence-web/email-daily-summaries-2',
        'github.com/uber/cadence-web/example-1',
      ]);
    resultsEl
      .textNodes('tbody td:nth-child(2)')
      .should.deep.equal([
        'ef2c889e-e709-4d50-99ee-3748dfa0a101',
        'db8da3c0-b7d3-48b7-a9b3-b6f566e58207',
      ]);
    resultsEl
      .attrValues('tbody td:nth-child(2) a', 'href')
      .should.deep.equal([
        '/domains/ci-test/workflows/github.com%2Fuber%2Fcadence-web%2Femail-daily-summaries-2/ef2c889e-e709-4d50-99ee-3748dfa0a101/summary',
        '/domains/ci-test/workflows/github.com%2Fuber%2Fcadence-web%2Fexample-1/db8da3c0-b7d3-48b7-a9b3-b6f566e58207/summary',
      ]);
    resultsEl
      .textNodes('tbody td:nth-child(3)')
      .should.deep.equal(['email-daily-summaries', 'example']);
    resultsEl
      .textNodes('tbody td:nth-child(4)')
      .should.deep.equal(['open', 'open']);
    resultsEl
      .textNodes('tbody td:nth-child(5)')
      .should.deep.equal(
        fixtures.workflows.open.map(wf => moment(wf.startTime).format('lll'))
      );

    resultsEl.should.not
      .contain('span.no-results')
      .and.not.contain('span.error');
  });

  it('should allow filtering by workflow id', async function test() {
    const [workflowsEl, scenario] = await workflowsTest(this.test);
    const wfIdEl = workflowsEl.querySelector(
      'header.filters input[name="workflowId"]'
    );

    await Promise.delay(10);
    wfIdEl.value.should.be.empty;

    scenario.withWorkflows(
      'open',
      {
        workflowId: '1234',
      },
      [
        {
          execution: {
            workflowId: '1234',
            runId: '5678',
          },
          type: { name: 'demo' },
        },
      ]
    );
    wfIdEl.input('1234');

    await retry(() =>
      workflowsEl
        .textNodes('.results tbody td:nth-child(3)')
        .should.deep.equal(['demo'])
    );
  });

  it('should respect query parameters for range and status', async function test() {
    const [testEl] = new Scenario(this.test)
      .withDomain('ci-test')
      .startingAt(
        '/domains/ci-test/workflows?status=FAILED&range=last-24-hours'
      )
      .withWorkflows('closed', {
        startTime: moment()
          .subtract(24, 'hours')
          .startOf('hour')
          .toISOString(),
        endTime: moment()
          .endOf('hour')
          .toISOString(),
        status: 'FAILED',
      })
      .withDomainDescription('ci-test')
      .go();

    await retry(() =>
      testEl
        .querySelectorAll('section.workflow-list section.results tbody tr')
        .should.have.length(1)
    );
    await Promise.delay(50);
  });

  it('should allow filtering by workflow name', async function test() {
    const [workflowsEl, scenario] = await workflowsTest(this.test);
    const wfNameEl = workflowsEl.querySelector(
      'header.filters input[name="workflowName"]'
    );

    await Promise.delay(10);
    wfNameEl.value.should.be.empty;

    scenario.withWorkflows(
      'open',
      {
        workflowName: 'demo',
      },
      demoWf
    );
    wfNameEl.input('demo');

    await retry(() =>
      workflowsEl
        .textNodes('.results tbody td:first-child')
        .should.deep.equal(['demoWfId'])
    );
  });

  it('should allow querying by status of the workflow', async function test() {
    const [workflowsEl, scenario] = await workflowsTest(this.test);
    const statusEl = workflowsEl.querySelector(
      'header.filters .dropdown.status'
    );

    await retry(() =>
      statusEl.querySelector('.selected-tag').should.have.trimmed.text('Open')
    );

    scenario.withWorkflows('closed', { status: 'FAILED' }, demoWf);
    await statusEl.selectItem('Failed');

    await retry(() =>
      workflowsEl
        .textNodes('.results tbody td:first-child')
        .should.deep.equal(['demoWfId'])
    );
  });

  it('should debounce query criteria changes when issuing requests', async function test() {
    const [workflowsEl, scenario] = await workflowsTest(this.test);
    const wfIdEl = workflowsEl.querySelector(
      'header.filters input[name="workflowId"]'
    );

    scenario.withWorkflows(
      'open',
      {
        workflowId: '1234',
      },
      [
        {
          execution: {
            workflowId: '1234',
            runId: '5678',
          },
          type: { name: 'demo' },
        },
      ]
    );

    wfIdEl.input('12');
    Promise.delay(5);
    wfIdEl.input('123');
    Promise.delay(5);
    wfIdEl.input('1234');

    await retry(() =>
      workflowsEl
        .textNodes('.results tbody td:nth-child(3)')
        .should.deep.equal(['demo'])
    );
  });

  it('should show errors from the server', async function test() {
    const [workflowsEl] = await workflowsTest(this.test, {
      status: 503,
      body: {
        message: 'Server Unavailable',
      },
    });

    await retry(() =>
      workflowsEl
        .querySelector('span.error')
        .should.have.text('Server Unavailable')
    );
  });

  it('should not show the table of results when there are no results', async function test() {
    const [workflowsEl] = await workflowsTest(this.test, []);

    await retry(() => {
      workflowsEl.querySelector('span.no-results').should.be.displayed;
      workflowsEl.querySelector('section.results table').should.not.be
        .displayed;
    });
  });

  it('should use query parameters from the URL', async function test() {
    const [testEl] = new Scenario(this.test)
      .withDomain('ci-test')
      .startingAt('/domains/ci-test/workflows?status=FAILED&workflowName=demo')
      .withWorkflows('closed', {
        status: 'FAILED',
        workflowName: 'demo',
      })
      .withDomainDescription('ci-test')
      .go();

    const workflowsEl = await testEl.waitUntilExists('section.workflow-list');

    workflowsEl
      .querySelector('header.filters input[name="workflowName"]')
      .value.should.equal('demo');
    workflowsEl
      .querySelector('header.filters .status .selected-tag')
      .should.have.trimmed.text('Failed');
  });
});
