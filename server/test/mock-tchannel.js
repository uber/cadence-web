const path = require('path');
const TChannel = require('tchannel');
const TChannelAsThrift = require('tchannel/as/thrift');

const mockTChannel = () => {
  let currentTest;

  const setCurrentTest = (test) => {
    currentTest = test;
  }

  server = new TChannel({ serviceName: 'cadence-frontend' });

  client = new TChannel();
  const cadenceChannel = client.makeSubChannel({
    serviceName: 'cadence-frontend',
  });
  const tchan = TChannelAsThrift({
    channel: cadenceChannel,
    entryPoint: path.join(__dirname, '../idl/thrift/cadence.thrift'),
  });
  const adminTChannel = TChannelAsThrift({
    channel: cadenceChannel,
    entryPoint: path.join(__dirname, '../idl/thrift/admin.thrift'),
  });

  const handler = serviceName => (ctx, req, head, body, cb) => {
    const mockName = req.endpoint.replace(`${serviceName}::`, '');

    if (!currentTest[mockName]) {
      throw new Error(`unexpected request to ${req.endpoint}`);
    }

    const bodyMock = currentTest[mockName](body, req);

    if (bodyMock instanceof Error) {
      cb(bodyMock);
    } else if (bodyMock && bodyMock.ok === false) {
      cb(null, bodyMock);
    } else {
      cb(null, { ok: true, head, body: bodyMock });
    }
  };

  [
    'ListOpenWorkflowExecutions',
    'ListClosedWorkflowExecutions',
    'ListWorkflowExecutions',
    'GetWorkflowExecutionHistory',
    'QueryWorkflow',
    'DescribeWorkflowExecution',
    'TerminateWorkflowExecution',
    'SignalWorkflowExecution',
    'ListDomains',
    'DescribeDomain',
    'DescribeTaskList',
  ].forEach(endpoint =>
    tchan.register(
      server,
      'WorkflowService::' + endpoint,
      {},
      handler('WorkflowService')
    )
  );

  adminTChannel.register(
    server,
    'AdminService::DescribeCluster',
    {},
    handler('AdminService')
  );

  return {
    client,
    server,
    setCurrentTest,
  };
};

module.exports = mockTChannel;
