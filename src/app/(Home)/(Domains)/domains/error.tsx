'use client';
import ErrorPanel from '@/components/error-panel/error-panel';

export default function DomainsPageError({
  error,
}: Readonly<{
  error: Error;
}>) {
  return <ErrorPanel message="Failed to load domains" />;
}
