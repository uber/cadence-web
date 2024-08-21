import { RequestError } from '@/utils/request/request-error';

import { type DomainPageTabErrorConfig } from '../domain-page-tabs-error/domain-page-tabs-error.types';

export default function getDomainWorkflowsErrorConfig(
  err: Error
): DomainPageTabErrorConfig {
  if (err instanceof RequestError && err.status === 404) {
    return {
      message: 'No workflows found for this domain',
      actions: [
        {
          kind: 'link-external',
          label: 'Get started on workflows',
          link: 'https://cadenceworkflow.io/docs/concepts/workflows',
        },
      ],
    };
  }

  return {
    message: 'Failed to load workflows',
    actions: [{ kind: 'retry', label: 'Retry' }],
  };
}
