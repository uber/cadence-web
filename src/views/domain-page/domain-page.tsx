import React from 'react';

export default async function DomainPage({
  params,
}: {
  params: { domain: string; cluster: string; domainTab: string };
}) {
  return (
    <>
      <div>
        Domain contents: {params.domain} {params.cluster}
      </div>
      <div>Selected tab: {params.domainTab}</div>
    </>
  );
}
