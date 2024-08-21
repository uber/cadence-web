'use client';
import { useParams } from 'next/navigation';

import ErrorPanel from '@/components/error-panel/error-panel';
import { RequestError } from '@/utils/request/request-error';

export default function DomainPageError({
  error,
  reset,
}: Readonly<{
  error: Error;
  reset: () => void;
}>) {
  const { domain } = useParams();

  if (error instanceof RequestError && error.status === 404) {
    return (
      <ErrorPanel
        error={error}
        message={`The domain "${domain} was not found`}
        actions={[
          {
            kind: 'link-internal',
            label: 'Go to domain overview',
            link: '/domains',
          },
        ]}
        reset={reset}
      />
    );
  }

  return (
    <ErrorPanel
      error={error}
      message="Failed to load domain"
      actions={[
        {
          kind: 'retry',
          label: 'Retry',
        },
      ]}
      reset={reset}
    />
  );
}
