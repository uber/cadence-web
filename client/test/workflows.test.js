import fixtures from './fixtures'
import moment from 'moment'
import qs from 'friendly-querystring'

describe('Workflows', function() {
  async function workflowsTest(mochaTest, initialWorkflows) {
    var [testEl, scenario] = new Scenario(mochaTest)
      .withDomain('ci-test')
      .startingAt('/domain/ci-test/workflows')
      .withWorkflows('open', null, initialWorkflows)
      .go()

    var workflows = await testEl.waitUntilExists('section.workflows')
    return [workflows, scenario]
  }

  const demoWf = [{
    execution: {
      workflowId: 'demoWfId',
      runId: 'demoRunId'
    },
    type: { name: 'demo' }
  }]

  it('should query for open workflows in the last day by default', async function() {
    var [workflowsEl, scenario] = await workflowsTest(this.test),
        resultsEl = workflowsEl.querySelector('section.results')

    workflowsEl.querySelector('div.status .selected-tag').should.contain.text('Open')

    await resultsEl.waitUntilExists('tbody tr:nth-child(2)')

    resultsEl.textNodes('th').should.deep.equal([
      'Workflow ID',
      'Run ID',
      'Name',
      'Status',
      'Start Time',
      'End Time'
    ])

    resultsEl.textNodes('tbody td:first-child').should.deep.equal([
      'github.com/uber/cadence-web/email-daily-summaries-2',
      'github.com/uber/cadence-web/example-1'
    ])
    resultsEl.textNodes('tbody td:nth-child(2)').should.deep.equal([
      'ef2c889e-e709-4d50-99ee-3748dfa0a101',
      'db8da3c0-b7d3-48b7-a9b3-b6f566e58207'
    ])
    resultsEl.attrValues('tbody td:nth-child(2) a', 'href').should.deep.equal([
      '/domain/ci-test/workflows/github.com%2Fuber%2Fcadence-web%2Femail-daily-summaries-2/ef2c889e-e709-4d50-99ee-3748dfa0a101/summary',
      '/domain/ci-test/workflows/github.com%2Fuber%2Fcadence-web%2Fexample-1/db8da3c0-b7d3-48b7-a9b3-b6f566e58207/summary'
    ])
    resultsEl.textNodes('tbody td:nth-child(3)').should.deep.equal([
      'email-daily-summaries',
      'example'
    ])
    resultsEl.textNodes('tbody td:nth-child(4)').should.deep.equal(['open', 'open'])
    resultsEl.textNodes('tbody td:nth-child(5)').should.deep.equal(
      fixtures.workflows.open.map(wf => moment(wf.startTime).format('lll'))
    )

    resultsEl.should.not.contain('span.no-results').and.not.contain('span.error')
  })

  it('should allow filtering by workflow id', async function () {
    var [workflowsEl, scenario] = await workflowsTest(this.test),
        wfIdEl = workflowsEl.querySelector('header.filters input[name="workflowId"]')

    await Promise.delay(10)
    wfIdEl.value.should.be.empty

    scenario.withWorkflows('open', {
      workflowId: '1234'
    }, [{
      execution: {
        workflowId: '1234',
        runId: '5678'
      },
      type: { name: 'demo' }
    }])
    wfIdEl.input('1234')

    await retry(() => workflowsEl.textNodes('.results tbody td:nth-child(3)').should.deep.equal(['demo']))
  })

  it('should allow filtering by workflow name', async function() {
    var [workflowsEl, scenario] = await workflowsTest(this.test),
        wfNameEl = workflowsEl.querySelector('header.filters input[name="workflowName"]')

    await Promise.delay(10)
    wfNameEl.value.should.be.empty

    scenario.withWorkflows('open', {
      workflowName: 'demo'
    }, demoWf)
    wfNameEl.input('demo')

    await retry(() => workflowsEl.textNodes('.results tbody td:first-child').should.deep.equal(['demoWfId']))
  })

  it('should allow changing the date range', async function () {
    var [workflowsEl, scenario] = await workflowsTest(this.test),
        dateRangeEl = workflowsEl.querySelector('header.filters .date-range-picker input')

    dateRangeEl.focus()
    var dayCells = Array.from(workflowsEl.querySelectorAll('.date-range-picker .ayou-calendar .ayou-day-cell'))
    dayCells.find(d => d.textContent === '11 ').trigger('click')

    await Promise.delay(50)

    const year = moment().year(), month = moment().month()
    scenario.withWorkflows('open', {
      startTime: moment([year, month, 11]).toISOString(),
      endTime: moment([year, month, 14]).toISOString()
    }, demoWf)
    dayCells.find(d => d.textContent === '14 ').trigger('click')

    await Promise.delay(100)
  })

  it('should allow querying by status of the workflow', async function () {
    var [workflowsEl, scenario] = await workflowsTest(this.test),
        statusEl = workflowsEl.querySelector('header.filters .dropdown.status')

    await retry(() => statusEl.querySelector('.selected-tag').should.have.trimmed.text('Open'))

    scenario.withWorkflows('closed', { status: 'FAILED' }, demoWf)
    await statusEl.selectItem('Failed')

    await retry(() => workflowsEl.textNodes('.results tbody td:first-child').should.deep.equal(['demoWfId']))
  })

  it('should show errors from the server', async function () {
    var [workflowsEl, scenario] = await workflowsTest(this.test, {
      status: 503,
      body: {
        message: 'Server Unavailable'
      }
    })

    await retry(() => workflowsEl.querySelector('span.error').should.have.text('Server Unavailable'))
  })

  it('should not show the table of results when there are no results', async function () {
    var [workflowsEl, scenario] = await workflowsTest(this.test, [])

    await retry(() => {
      workflowsEl.querySelector('span.no-results').should.be.displayed
      workflowsEl.querySelector('section.results table').should.not.be.displayed
    })
  })

  it('should use query parameters from the URL', async function () {
    var [testEl, scenario] = new Scenario(this.test)
      .withDomain('ci-test')
      .startingAt('/domain/ci-test/workflows?status=FAILED&workflowName=demo')
      .withWorkflows('closed', {
        status: 'FAILED',
        workflowName: 'demo'
      })
      .go()

    var workflowsEl = await testEl.waitUntilExists('section.workflows')
    workflowsEl.querySelector('header.filters input[name="workflowName"]').value.should.equal('demo')
    workflowsEl.querySelector('header.filters .status .selected-tag').should.have.trimmed.text('Failed')
  })
})