import moment from 'moment'

var timeBasis = moment().startOf('day').add(5, 'hours')

export default {
  timeBasis,
  workflows: {
    open: [{
      execution: {
        workflowId: 'email-daily-summaries',
        runId: 'ef2c889e-e709-4d50-99ee-3748dfa0a101'
      },
      type: {
        name: 'github.com/uber/cadence-web/email-daily-summaries'
      },
      startTime: moment(timeBasis).subtract(3, 'minutes').toISOString(),
    }, {
      execution: {
        workflowId: 'example',
        runId: 'db8da3c0-b7d3-48b7-a9b3-b6f566e58207'
      },
      type: {
        name: 'github.com/uber/cadence-web/example'
      },
      startTime: moment(timeBasis).subtract(20, 'seconds').toISOString(),
    }],
    closed: [{
      execution: {
        workflowId: 'email-daily-summaries',
        runId: '51ccc0d1-6ffe-4a7a-a89f-6b5154df86f7'
      },
      type: {
        name: 'github.com/uber/cadence-web/email-daily-summaries'
      },
      closeStatus: 'COMPLETED',
      startTime: moment(timeBasis).subtract(3, 'minutes').subtract(1, 'day').toISOString(),
      closeTime: moment(timeBasis).subtract(2, 'minutes').subtract(1, 'day').toISOString(),
    }]
  }
}