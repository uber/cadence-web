import Link from 'next/link';

import getWorkflowExecutionLinkProps from '../get-workflow-execution-link-props';

describe('getWorkflowExecutionLinkProps', () => {
  it('should return correct link props for given params', () => {
    const params = {
      cluster: 'testCluster',
      domain: 'testDomain',
      workflowId: 'testWorkflowId',
      runId: 'testRunId',
    };

    const expectedProps = {
      $as: Link,
      $style: { fontWeight: 'inherit' },
      href: `/domains/testDomain/testCluster/workflows/testWorkflowId/testRunId`,
    };

    expect(getWorkflowExecutionLinkProps(params)).toEqual(expectedProps);
  });
});
