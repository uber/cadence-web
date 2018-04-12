import fixtures from './fixtures'
import moment from 'moment'

describe('History', function() {
  async function historyTest(mochaTest, additionalUrlQuery) {
    var [testEl, scenario] = new Scenario(mochaTest)
      .withDomain('ci-test')
      .startingAt('/domain/ci-test/history?workflowId=email-daily-summaries&runId=emailRun1' + (additionalUrlQuery || ''))
      .withHistory('email-daily-summaries', 'emailRun1')
      .go()

    var historyEl = await testEl.waitUntilExists('section.history')
    return [historyEl, scenario]
  }

  function generateActivityEvents(count, offset) {
    return new Array(count).fill('').map((_, i) => ({
      timestamp: moment().add(offset + i, 'second').toISOString(),
      eventType: 'ActivityTaskScheduled',
      eventId: (offset || 0) + i + 2,
      details: {
        activityId: String(i),
        activityType: { name: 'send-emails' }
      }
    }))
  }

  async function runningWfHistoryTest(mochaTest) {
    var [testEl, scenario] = new Scenario(mochaTest)
      .withDomain('ci-test')
      .startingAt('/domain/ci-test/history?workflowId=long-running-op-2&runId=theRunId&format=grid')
      .withHistory('long-running-op-2', 'theRunId', [{
        timestamp: moment().toISOString(),
        eventType: 'WorkflowExecutionStarted',
        eventId: 1,
        details: {
          workflowType: {
            name: 'long-running-op'
          }
        }
      }].concat(generateActivityEvents(15)), true)
      .go(true)

    return [await testEl.waitUntilExists('section.history section.results'), scenario]
  }

  it('should have empty inputs and not run a query if directly navigated to', async function () {
    var testEl = new Scenario(this.test)
      .withDomain('ci-test')
      .startingAt('/domain/ci-test/history')
      .render()

    var historyEl = await testEl.waitUntilExists('section.history')
    historyEl.querySelector('input[name="workflowId"]').value.should.be.empty
    historyEl.querySelector('input[name="runId"]').value.should.be.empty

    historyEl.querySelector('section.results table').should.not.be.displayed
    historyEl.textNodes('header.controls .view-formats a').should.deep.equal(['Compact', 'Grid', 'JSON'])
    historyEl.querySelector('.view-formats .compact').should.have.class('active')
    historyEl.querySelector('header.controls').should.not.contain('a.stack-trace')

    await Promise.delay(100)
  })

  it('should query for workflows once workflow ID and run ID are provided', async function () {
    var [testEl, scenario] = new Scenario(this.test)
      .withDomain('ci-test')
      .startingAt('/domain/ci-test/history')
      .go()

    var historyEl = await testEl.waitUntilExists('section.history')

    await Promise.delay(200)
    historyEl.querySelector('input[name="workflowId"]').input('example')

    await Promise.delay(200)
    scenario.withHistory('example', 'run3')
    historyEl.querySelector('input[name="runId"]').input('run3')

    await retry(() => historyEl.querySelectorAll('section.results .compact-view .event-node').should.have.length(12))
  })

  it('should allow the user to change the view format', async function () {
    var [historyEl, scenario] = await historyTest(this.test)
    await retry(() => historyEl.querySelectorAll('.compact-view .event-node').should.have.length(12))

    var resultsEl = historyEl.querySelector('section.results')
    resultsEl.should.not.have.descendant('pre.json')
    historyEl.querySelector('.view-formats a.json').trigger('click')

    var jsonView = await resultsEl.waitUntilExists('pre.json')
    jsonView.should.contain.text('"eventId":')
    resultsEl.should.not.have.descendant('.compact-view')
    scenario.location.should.equal('/domain/ci-test/history?workflowId=email-daily-summaries&runId=emailRun1&format=json')
  })

  it('should reset state if workflow id and run id are cleared', async function() {
    var [resultsEl, scenario] = await runningWfHistoryTest(this.test),
        historyEl = scenario.vm.$el.querySelector('section.history')

    await historyEl.waitUntilExists('.results tbody tr:nth-child(4)')
    historyEl.should.have.class('has-results').and.have.descendant('a.stack-trace')

    scenario.vm.$el.querySelector('header.top-bar a.history').trigger('click')
    await retry(() => scenario.location.should.equal('/domain/ci-test/history?'))

    historyEl.should.not.have.class('has-results').and.not.have.descendant('a.stack-trace')
    await Promise.delay(100)
  })

  it('should allow a stack trace to be viewed for a running workflow', async function () {
    var [resultsEl, scenario] = await runningWfHistoryTest(this.test),
        stackTrace = await scenario.vm.$el.waitUntilExists('section.history .controls a.stack-trace')

    stackTrace.should.have.trimmed.text('Stack Trace')
    scenario.api.post('/api/domain/ci-test/workflows/long-running-op-2/theRunId/query/__stack_trace', {
      queryResult: 'goroutine 1:\n\tat foo.go:56'
    })
    stackTrace.trigger('click')

    var modal = await scenario.vm.$el.waitUntilExists('section.history [data-modal="stack-trace"]')
    await retry(() => modal.should.have.descendant('header h2').and.have.trimmed.text('Stack Trace'))
    modal.querySelector('header span').should.contain.text(`as of ${moment().format('ll')}`)
    modal.querySelector('pre').should.have.text('goroutine 1:\n\tat foo.go:56')

    modal.querySelector('a.close').trigger('click')
    await retry(() => scenario.vm.$el.querySelector('section.history').should.not.contain('[data-modal="stack-trace"]'))
  })

  it('should download the currently loaded history events as json when export is clicked', async function () {
    var [historyEl, scenario] = await historyTest(this.test),
        exportEl = await scenario.vm.$el.waitUntilExists('section.history .controls a.export')

    exportEl.trigger('click')
    var downloadEl = document.body.querySelector('a[download]')
    downloadEl.should.have.attr('download', 'email daily summaries - emailRun1.json')

    var href = decodeURIComponent(downloadEl.getAttribute('href'))
    var eventsJson = JSON.parse(decodeURIComponent(href).replace('data:text/plain;charset=utf-8,', ''))

    eventsJson.length.should.equal(12)
    eventsJson.map(e => e.eventType).slice(3,6).should.deep.equal([
      'DecisionTaskCompleted', 'MarkerRecorded', 'ActivityTaskScheduled'
    ])
  })

  describe('Compact View', function() {
    it('should build a heiarchy of events', async function () {
      var [historyEl, scenario] = await historyTest(this.test)
      await historyEl.waitUntilExists('.compact-view > .event-node')

      historyEl.textNodes('.compact-view > .event-node > a[data-event-id]').should.deep.equal([
        'WorkflowExecutionStarted', 'DecisionTaskScheduled', 'DecisionTaskScheduled'
      ])
      historyEl.attrValues('.compact-view > .event-node > a', 'data-event-id').should.deep.equal([
        '1', '2', '9'
      ])
      historyEl.should.have.descendant(
        '.compact-view > .event-node.DecisionTaskScheduled > .event-children > .event-node.DecisionTaskStarted > .event-children'
      )
      historyEl.should.have.descendant(
        '.compact-view .DecisionTaskScheduled .DecisionTaskStarted .DecisionTaskCompleted .ActivityTaskStarted .ActivityTaskCompleted'
      )
    })

    it('should show details of an event when clicked', async function () {
      var [historyEl, scenario] = await historyTest(this.test),
          activityStartLink = await historyEl.waitUntilExists('.ActivityTaskStarted a[data-event-id="7"]'),
          activityStartEl = activityStartLink.parentElement

      historyEl.should.not.contain('.compact-view dl.details')
      activityStartEl.should.not.have.class('active')
      activityStartLink.trigger('click')

      await retry(() => activityStartLink.should.have.class('active'))
      scenario.location.should.equal('/domain/ci-test/history?workflowId=email-daily-summaries&runId=emailRun1&eventId=7')
      historyEl.textNodes('.compact-view dl.details dt').should.deep.equal(['scheduledEventId', 'requestId'])
    })

    it('should request more pages until it fills up scroll area', async function () {
      var [testEl, scenario] = new Scenario(this.test)
        .withDomain('ci-test')
        .startingAt('/domain/ci-test/history?workflowId=long-running-op-1&runId=theRunId')
        .withHistory('long-running-op-1', 'theRunId', [{
          timestamp: moment().toISOString(),
          eventType: 'WorkflowExecutionStarted',
          eventId: 1,
          details: {
            workflowType: {
              name: 'long-running-op'
            }
          }
        }].concat(generateActivityEvents(2)), true)
        .withHistory('long-running-op-1', 'theRunId', generateActivityEvents(3, 2), true)
        .withHistory('long-running-op-1', 'theRunId', generateActivityEvents(5, 5), true)
        .go(true)

      var historyEl = await testEl.waitUntilExists('section.history')
      await retry(() => historyEl.querySelectorAll('.compact-view a[data-event-id]').should.have.length(11))

      await Promise.delay(100)
    })
  })

  describe('Grid View', function() {
    it('should show full results in a grid', async function () {
      var [historyEl, scenario] = await historyTest(this.test)
      await historyEl.waitUntilExists('.results tbody tr:nth-child(4)')

      historyEl.textNodes('table thead th').should.deep.equal(['ID', 'Type', 'Elapsed', 'Details'])
      historyEl.textNodes('table tbody td:nth-child(1)').should.deep.equal(
        new Array(12).fill('').map((_, i) => String(i + 1))
      )
      historyEl.textNodes('table tbody td:nth-child(2)').slice(0, 3).should.deep.equal([
        'WorkflowExecutionStarted', 'DecisionTaskScheduled', 'DecisionTaskStarted'
      ])
      historyEl.textNodes('table tbody td:nth-child(3)').should.deep.equal([
        moment(fixtures.history.emailRun1[0].timestamp).format('MMM Do h:mm:ss a'),
        '', '', '1s (+1s)', '2s (+1s)', '3s (+1s)', '8s (+5s)', '19s (+11s)',
        '30s (+11s)', '41s (+11s)', '52s (+11s)', '1m 4s (+12s)'
      ])
    })

    it('should show details as flattened key-value pairs from parsed json, except for result and input', async function () {
      var [historyEl, scenario] = await historyTest(this.test),
          startDetails = await historyEl.waitUntilExists('.results tbody tr:first-child td:nth-child(4)'),
          inputPreText = JSON.stringify(fixtures.history.emailRun1[0].details.input, null, 2)

      startDetails.textNodes('dl.details dt').should.deep.equal([
        'workflowType.name', 'taskList.name', 'input', 'executionStartToCloseTimeoutSeconds', 'taskStartToCloseTimeoutSeconds'
      ])
      startDetails.textNodes('dl.details dd').should.deep.equal([
        'email-daily-summaries', 'ci-task-queue', inputPreText, '360', '180'
      ])
      startDetails.textNodes('dl.details dd pre').should.deep.equal([inputPreText])
    })


    it('should request more pages only when the user scrolls to the bottom', async function () {
      var [resultsEl, scenario] = await runningWfHistoryTest(this.test)
      await retry(() => resultsEl.querySelectorAll('tbody tr').should.have.length(16))

      resultsEl.scrollTop = 100
      await Promise.delay(50)

      resultsEl.scrollTop = resultsEl.scrollHeight - resultsEl.offsetHeight - 100
      await Promise.delay(100)

      scenario.withHistory('long-running-op-2', 'theRunId', generateActivityEvents(8, 15))
      resultsEl.scrollTop = resultsEl.scrollHeight - resultsEl.offsetHeight
      await Promise.delay(100)
    })
  })
})