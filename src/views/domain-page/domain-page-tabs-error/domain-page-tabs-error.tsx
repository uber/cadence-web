import { useParams } from 'next/navigation';

import ErrorPanel from '@/components/error-panel/error-panel';
import { type RequestError } from '@/utils/request/request-error';

import domainPageTabsErrorConfig from '../config/domain-page-tabs-error.config';
import { type DomainTabName } from '../domain-page-content/domain-page-content.types';

export default function DomainPageContentError({
  error,
  reset,
}: Readonly<{
  error: RequestError;
  reset: () => void;
}>) {
  const { domainTab } = useParams();
  const getConfig = domainPageTabsErrorConfig[domainTab as DomainTabName];

  if (typeof getConfig !== 'function') {
    return (
      <ErrorPanel
        error={error}
        message={'Failed to load domain content'}
        reset={reset}
      />
    );
  }

  const errorConfig = getConfig(error);
  return (
    <ErrorPanel
      error={error}
      message={errorConfig.message}
      actions={errorConfig.actions}
      reset={reset}
    />
  );
}
