import React from 'react';

import MetadataTable from '@/components/metadata-table/metadata-table';

import { mockDomainInfo } from '../__fixtures__/domain-info';
import domainPageMetadataTableConfig from '../config/domain-page-metadata-table.config';
import { type DomainPageTabContentProps } from '../domain-page-content/domain-page-content.types';

export default function DomainPageMetadata(props: DomainPageTabContentProps) {
  return (
    <MetadataTable
      metadataObj={mockDomainInfo}
      metadataTableConfig={domainPageMetadataTableConfig}
    />
  );
}
