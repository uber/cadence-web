import fixtures from './fixtures'
import moment from 'moment'

describe('Execution', function() {
  function executionTest(mochaTest, o) {
    o = Object.assign({
      workflowId: 'email-daily-summaries',
      runId: 'emailRun1',
      view: 'summary'
    }, o)

    return [new Scenario(mochaTest)
      .withDomain('ci-test')
      .withExecution(o.workflowId, o.runId, o.execution)
      .startingAt(`/domain/ci-test/workflows/${o.workflowId}/${o.runId}/${o.view}${o.query ? '?' + o.query : ''}`), o]
  }

  async function summaryTest(mochaTest, o) {
    var [scenario, opts] = executionTest(mochaTest, Object.assign({ view: 'summary' }, o))

    scenario.withSummaryInput(opts.workflowId, opts.runId, opts.input || null)

    var summaryEl = await scenario.render().waitUntilExists('section.execution section.execution-summary')
    return [summaryEl, scenario]
  }

  it('should show summary and history tabs for completed workflows', async function () {
    var [,scenario] = await summaryTest(this.test, {
      execution: {
        workflowExecutionInfo: {
          closeTime: moment().subtract(1, 'day'),
          closeStatus: 'COMPLETED',
          type: {},
          execution: {}
        },
      }
    })

    scenario.vm.$el.attrValues('section.execution > nav a', 'href').should.deep.equal([
      '/domain/ci-test/workflows/email-daily-summaries/emailRun1/summary',
      '/domain/ci-test/workflows/email-daily-summaries/emailRun1/history',
      '/domain/ci-test/workflows/email-daily-summaries/emailRun1/stack-trace'
    ])
    scenario.vm.$el.querySelector('section.execution > nav a.summary').should.have.class('router-link-active')
    scenario.vm.$el.querySelector('section.execution > nav a.stack-trace').should.not.be.displayed
  })

  it('should also show a stack trace tab for running workflows', async function () {
    var [,scenario] = await summaryTest(this.test)
    scenario.vm.$el.attrValues('section.execution > nav a', 'href').should.deep.equal([
      '/domain/ci-test/workflows/email-daily-summaries/emailRun1/summary',
      '/domain/ci-test/workflows/email-daily-summaries/emailRun1/history',
      '/domain/ci-test/workflows/email-daily-summaries/emailRun1/stack-trace'
    ])
  })

  describe('Summary', function() {
    it('should show statistics from the workflow', async function () {
      var [summaryEl] = await summaryTest(this.test)

      summaryEl.querySelector('.workflow-id dd').should.have.text('email-daily-summaries')
      summaryEl.querySelector('.run-id dd').should.have.text('emailRun1')
      summaryEl.querySelector('.history-length dd').should.have.text('14')
      summaryEl.querySelector('.workflow-name dd').should.have.text('CIDemoWorkflow')
      summaryEl.querySelector('.task-list dd').should.have.text('ci_task_list')
      summaryEl.querySelector('.started-at dd').should.have.text(moment().startOf('hour').subtract(2, 'minutes').format('dddd MMMM Do, h:mm:ss a'))
      summaryEl.should.not.have.descendant('.close-time')
      summaryEl.should.not.have.descendant('.pending-activities')
      summaryEl.querySelector('.workflow-status dd').should.contain.text('running')
      summaryEl.querySelector('.workflow-status loader.bar').should.be.displayed
    })

    it('should show the input of the workflow, and any pending events', async function () {
      var [summaryEl] = await summaryTest(this.test, {
        execution: {
          pendingActivities: [{
            activityId: 4,
            status: 'STARTED'
          }, {
            activityId: 5,
            status: 'QUEUED'
          }]
        },
        input: {
          startIdx: 5,
          color: 'blue'
        }
      })

      summaryEl.querySelectorAll('.pending-activities dl.details').should.have.length(2)
      summaryEl.textNodes('.pending-activities dt').should.deep.equal([
        'Pending Activities', 'activityId', 'status', 'activityId', 'status'
      ])
      summaryEl.textNodes('.pending-activities > dd:first-of-type dd').should.deep.equal(['4', 'STARTED'])
      summaryEl.textNodes('.pending-activities > dd:nth-of-type(2) dd').should.deep.equal(['5', 'QUEUED'])

      summaryEl.querySelector('.workflow-input pre').should.have.text(JSON.stringify({
        startIdx: 5,
        color: 'blue'
      }, null, 2))
    })
  })

  describe('History', function() {
    async function historyTest(mochaTest, o) {
      var [scenario, opts] = executionTest(mochaTest, Object.assign({ view: 'history' }, o))

      scenario.withHistory(opts.workflowId, opts.runId)

      var historyEl = await scenario.render().waitUntilExists('section.history')
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
      var [testEl, scenario] = executionTest(mochaTest, {
          workflowId: 'long-running-op-2',
          runId: 'theRunId',
          view: 'history'
        })[0].withExecution('long-running-op-2', 'theRunId')
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

    it('should allow the user to change the view format', async function () {
      var [historyEl, scenario] = await historyTest(this.test)
      var resultsEl = historyEl.querySelector('section.results')

      await retry(() => resultsEl.querySelectorAll('tbody tr').should.have.length(12))
      resultsEl.should.not.have.descendant('pre.json')
      resultsEl.should.not.have.descendant('.compact-view')

      historyEl.querySelector('.view-formats a.compact').trigger('click')
      await retry(() => historyEl.querySelectorAll('.compact-view .event-node').should.have.length(12))

      resultsEl.should.not.have.descendant('pre.json')
      resultsEl.querySelector('table').should.not.be.displayed
      scenario.location.should.equal('/domain/ci-test/workflows/email-daily-summaries/emailRun1/history?format=compact')
      historyEl.querySelector('.view-formats a.json').trigger('click')

      var jsonView = await resultsEl.waitUntilExists('pre.json')
      jsonView.should.contain.text('"eventId":')
      resultsEl.should.not.have.descendant('.compact-view')
      scenario.location.should.equal('/domain/ci-test/workflows/email-daily-summaries/emailRun1/history?format=json')
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
        var [historyEl, scenario] = await historyTest(this.test, { query: 'format=compact' })
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
        var [historyEl, scenario] = await historyTest(this.test, { query: 'format=compact' }),
            activityStartLink = await historyEl.waitUntilExists('.ActivityTaskStarted a[data-event-id="7"]'),
            activityStartEl = activityStartLink.parentElement

        historyEl.should.not.contain('.compact-view dl.details')
        activityStartEl.should.not.have.class('active')
        activityStartLink.trigger('click')

        await retry(() => activityStartLink.should.have.class('active'))
        scenario.location.should.equal('/domain/ci-test/workflows/email-daily-summaries/emailRun1/history?format=compact&eventId=7')
        historyEl.textNodes('.compact-view dl.details dt').should.deep.equal(['scheduledEventId', 'requestId'])
      })

      it('should request more pages until it fills up scroll area', async function () {
        var [testEl, scenario] = new Scenario(this.test)
          .withDomain('ci-test')
          .startingAt('/domain/ci-test/workflows/long-running-op-1/theRunId/history?format=compact')
          .withExecution('long-running-op-1', 'theRunId')
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

  describe('Stack Trace', function() {
    it('should show the current stack trace', async function () {
      var [scenario, opts] = executionTest(this.test, { view: 'stack-trace' })

      scenario.api.postOnce(`/api/domain/ci-test/workflows/${encodeURIComponent(opts.workflowId)}/${encodeURIComponent(opts.runId)}/query/__stack_trace`, {
        queryResult: 'goroutine 1:\n\tat foo.go:56'
      })

      var stackTraceEl = await scenario.render().waitUntilExists('section.stack-trace')

      await retry(() => stackTraceEl.querySelector('header span').should.contain.text(`Stack trace at ${moment().format('h:mm')}`))
      stackTraceEl.querySelector('pre').should.have.text('goroutine 1:\n\tat foo.go:56')
    })

    it('should allow the user to refresh the stack trace', async function () {
      var [scenario, opts] = executionTest(this.test, { view: 'stack-trace' }),
          called = 0

      scenario.api.post(`/api/domain/ci-test/workflows/${encodeURIComponent(opts.workflowId)}/${encodeURIComponent(opts.runId)}/query/__stack_trace`, () => {
        if (++called === 1) {
          return { queryResult: 'goroutine 1:\n\tat foo.go:56' }
        } else if (called === 2) {
          return { queryResult: 'goroutine 1:\n\tat foo.go:56\n\n\tgoroutine 2:\n\tat bar.go:42' }
        } else {
          throw new Error(`stack trace query API was called too many times (${called})`)
        }
      })

      var stackTraceEl = await scenario.render().waitUntilExists('section.stack-trace')
      await retry(() =>  stackTraceEl.querySelector('pre').should.have.text('goroutine 1:\n\tat foo.go:56'))

      stackTraceEl.querySelector('a.refresh').trigger('click')
      await retry(() =>  stackTraceEl.querySelector('pre').should.have.text('goroutine 1:\n\tat foo.go:56\n\n\tgoroutine 2:\n\tat bar.go:42'))
    })
  })
})