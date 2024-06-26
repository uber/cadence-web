'use client';
import ErrorPanel from '@/components/error-panel/error-panel';

export default function DomainTabsError({
  error,
}: Readonly<{
  error: Error;
}>) {
  return <ErrorPanel message="Failed to load domain content" />;
}
