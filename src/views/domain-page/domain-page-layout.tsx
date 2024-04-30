import React from 'react';

export default async function DomainPageLayout({
  params,
  children,
}: {
  params: { domain: string; cluster: string };
  children: React.ReactNode;
}) {
  return (
    <>
      <div>Domain header: {params.domain}</div>
      <div>tabs</div>
      {children}
    </>
  );
}
