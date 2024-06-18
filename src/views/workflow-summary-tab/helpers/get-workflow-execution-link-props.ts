import { type ComponentProps } from 'react';

import { type StyledLink } from 'baseui/link';
import { type Route } from 'next';
import Link from 'next/link';

const getWorkflowExecutionLinkProps = (params: {
  cluster: string;
  domain: string;
  workflowId: string;
  runId: string;
}): ComponentProps<typeof StyledLink> => ({
  $as: Link,
  $style: { fontWeight: 'inherit' },
  href: `/domains/${params.domain}/${params.cluster}/workflows/${params.workflowId}/${params.runId}` as Route,
});

export default getWorkflowExecutionLinkProps;
