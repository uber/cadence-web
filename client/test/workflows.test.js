import moment from 'moment';
import fixtures from './fixtures';

describe('Workflows', () => {
  async function workflowsTest(mochaTest, initialWorkflows, query, domainDesc) {
    const [testEl, scenario] = new Scenario(mochaTest)
      .withDomain('ci-test')
      .startingAt('/domain/ci-test/workflows')
      .withWorkflows('open', query, initialWorkflows)
      .withDomainDescription('ci-test', domainDesc)
      .go();

    const workflows = await testEl.waitUntilExists('section.workflows');

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
      .and.have.attribute('href', '/domain/ci-test/workflows');

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
        '/domain/ci-test/workflows/github.com%2Fuber%2Fcadence-web%2Femail-daily-summaries-2/ef2c889e-e709-4d50-99ee-3748dfa0a101/summary',
        '/domain/ci-test/workflows/github.com%2Fuber%2Fcadence-web%2Fexample-1/db8da3c0-b7d3-48b7-a9b3-b6f566e58207/summary',
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

  it('should query for workflows to the last of the retention window if less than 30 days, and show that option in the relative range picker', async function test() {
    const [workflowsEl] = await workflowsTest(
      this.test,
      null,
      {
        startTime: moment()
          .subtract(14, 'days')
          .startOf('day')
          .toISOString(),
      },
      {
        configuration: {
          workflowExecutionRetentionPeriodInDays: 14,
        },
      }
    );
    const dateRangePicker = workflowsEl.querySelector(
      'header.filters .date-range-picker'
    );

    await retry(() =>
      workflowsEl
        .querySelectorAll('section.results tbody tr')
        .should.have.length(2)
    );

    dateRangePicker
      .querySelector('.selected-tag')
      .should.have.trimmed.text('Last 14 days');
    const relativeOptions = await dateRangePicker.selectOptions();

    relativeOptions.should.deep.equal([
      'Last 3 hours',
      'Last 24 hours',
      'Last 3 days',
      'Last 7 days',
      'Last 14 days',
      'Custom range',
    ]);
  });

  it('should query for workflows for the past 30 days if the retention policy is beyond 30 days', async function test() {
    const [workflowsEl] = await workflowsTest(
      this.test,
      null,
      {
        startTime: moment()
          .subtract(30, 'days')
          .startOf('day')
          .toISOString(),
      },
      {
        configuration: {
          workflowExecutionRetentionPeriodInDays: 365,
        },
      }
    );
    const dateRangePicker = workflowsEl.querySelector(
      'header.filters .date-range-picker'
    );

    await retry(() =>
      workflowsEl
        .querySelectorAll('section.results tbody tr')
        .should.have.length(2)
    );

    dateRangePicker
      .querySelector('.selected-tag')
      .should.have.trimmed.text('Last 30 days');
    const relativeOptions = await dateRangePicker.selectOptions();

    relativeOptions.should.deep.equal([
      'Last 3 hours',
      'Last 24 hours',
      'Last 3 days',
      'Last 7 days',
      'Last 30 days',
      'Last 3 months',
      'Custom range',
    ]);
  });

  it('should load and save last relative time ranges in localStorage', async function test() {
    localStorage.setItem('ci-test:workflows-time-range', 'last-7-days');

    const [workflowsEl, scenario] = await workflowsTest(
      this.test,
      null,
      {
        startTime: moment()
          .subtract(7, 'days')
          .startOf('day')
          .toISOString(),
      },
      {
        configuration: {
          workflowExecutionRetentionPeriodInDays: 120,
        },
      }
    );
    const dateRangePicker = workflowsEl.querySelector(
      'header.filters .date-range-picker'
    );

    await retry(() =>
      workflowsEl
        .querySelectorAll('section.results tbody tr')
        .should.have.length(2)
    );
    scenario.location.should.equal(
      '/domain/ci-test/workflows?range=last-7-days&status=OPEN'
    );

    dateRangePicker
      .querySelector('.selected-tag')
      .should.have.trimmed.text('Last 7 days');

    scenario.withWorkflows(
      'open',
      {
        startTime: moment()
          .subtract(3, 'months')
          .startOf('month')
          .toISOString(),
        endTime: moment()
          .endOf('month')
          .toISOString(),
      },
      [fixtures.workflows.open[0]]
    );
    dateRangePicker.selectItem('Last 3 months');

    await retry(() =>
      workflowsEl
        .querySelectorAll('section.results tbody tr')
        .should.have.length(1)
    );
    scenario.location.should.equal(
      '/domain/ci-test/workflows?range=last-3-months&status=OPEN'
    );
    localStorage
      .getItem('ci-test:workflows-time-range')
      .should.equal('last-3-months');
    dateRangePicker
      .querySelector('.selected-tag')
      .should.have.trimmed.text('Last 3 months');
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
      .startingAt('/domain/ci-test/workflows?status=FAILED&range=last-24-hours')
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
        .querySelectorAll('section.workflows section.results tbody tr')
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

  it('should allow changing the date range', async function test() {
    const [workflowsEl, scenario] = await workflowsTest(this.test);
    const dateRangeEl = workflowsEl.querySelector(
      'header.filters .date-range-picker input'
    );

    dateRangeEl.focus();

    await Promise.delay(150);

    const dayCells = Array.from(
      workflowsEl.querySelectorAll(
        '.date-range-picker .ayou-calendar .ayou-day-cell'
      )
    );

    dayCells.find(d => d.textContent === '11 ').trigger('click');

    await Promise.delay(50);

    const year = moment().year();
    const month = moment().month();

    scenario.withWorkflows(
      'open',
      {
        startTime: moment([year, month, 11]).toISOString(),
        endTime: moment([year, month, 14]).toISOString(),
      },
      demoWf
    );
    dayCells.find(d => d.textContent === '14 ').trigger('click');

    await Promise.delay(100);
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
      .startingAt('/domain/ci-test/workflows?status=FAILED&workflowName=demo')
      .withWorkflows('closed', {
        status: 'FAILED',
        workflowName: 'demo',
      })
      .withDomainDescription('ci-test')
      .go();

    const workflowsEl = await testEl.waitUntilExists('section.workflows');

    workflowsEl
      .querySelector('header.filters input[name="workflowName"]')
      .value.should.equal('demo');
    workflowsEl
      .querySelector('header.filters .status .selected-tag')
      .should.have.trimmed.text('Failed');
  });
});
