'use client';
import React from 'react';
import PageHeaderSection from '@/components/page-header-section/page-header-section';
import CadenceLogo from '@/components/cadence-logo/cadence-logo';

import { type Props } from './domain-page-header.types';
import { styled } from './domain-page-header.styles';

export default function DomainPageHeader(props: Props) {
  return (
    <PageHeaderSection>
      <styled.HeaderContainer>
        <CadenceLogo />
        <styled.DomainInfoContainer>
          <styled.DomainNameLabel>{props.domain}</styled.DomainNameLabel>
          {props.domainMetadata}
        </styled.DomainInfoContainer>
      </styled.HeaderContainer>
    </PageHeaderSection>
  );
}
