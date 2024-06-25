'use client';
import React from 'react';

import ListTable from '@/components/list-table/list-table';
import PageSection from '@/components/page-section/page-section';

import { mockDomainInfo } from '../__fixtures__/domain-info';
import domainPageMetadataTableConfig from '../config/domain-page-metadata-table.config';
import { type DomainPageTabContentProps } from '../domain-page-content/domain-page-content.types';

import { styled } from './domain-page-metadata.styles';

export default function DomainPageMetadata(props: DomainPageTabContentProps) {
  return (
    <PageSection>
      <styled.MetadataContainer>
        <ListTable
          data={mockDomainInfo}
          listTableConfig={domainPageMetadataTableConfig}
        />
      </styled.MetadataContainer>
    </PageSection>
  );
}
