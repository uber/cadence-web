'use client';
import ErrorPanel from '@/components/error-panel/error-panel';

export default function DomainPageError({
  error,
}: Readonly<{
  error: Error;
}>) {
  return <ErrorPanel message="Failed to load domain" />;
}
