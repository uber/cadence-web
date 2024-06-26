'use client';
import ErrorPanel from '@/components/error-panel/error-panel';

export default function WorkflowTabsError({
  error,
}: Readonly<{
  error: Error;
}>) {
  return <ErrorPanel message="Failed to load workflow content" />;
}
