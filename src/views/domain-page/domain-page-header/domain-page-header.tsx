'use client';
import React from 'react';
import PageHeaderSection from '@/components/page-header-section/page-header-section';

import { type Props } from './domain-page-header.types';
import { styled } from './domain-page-header.styles';

export default function DomainPageHeader(props: Props) {
  return (
    <PageHeaderSection>
      <styled.DomainInfoContainer>
        {/* Cadence logo somewhere here */}
        <styled.DomainNameLabel>{props.domain}</styled.DomainNameLabel>
        {props.domainMetadata}
      </styled.DomainInfoContainer>
    </PageHeaderSection>
  );
}
