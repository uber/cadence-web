'use client';
import ErrorPanel from '@/components/error-panel/error-panel';

export default function HomePageError({
  error,
}: Readonly<{
  error: Error;
}>) {
  return <ErrorPanel message="Something went wrong" />;
}
