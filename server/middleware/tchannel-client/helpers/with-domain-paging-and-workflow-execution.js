const withDomainPaging = require('./with-domain-paging');
const withWorkflowExecution = require('./with-workflow-execution');

const withDomainPagingAndWorkflowExecution = ctx => body =>
  Object.assign(withDomainPaging(ctx)(body), withWorkflowExecution(ctx)(body));

module.exports = withDomainPagingAndWorkflowExecution;
