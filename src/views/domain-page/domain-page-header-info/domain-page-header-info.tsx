'use client';
import React from 'react';

import { styled } from './domain-page-header-info.styles';
import { Props } from './domain-page-header-info.types';
import DomainPageHeaderInfoItem from '../domain-page-header-info-item/domain-page-header-info-item';
import DomainPageClusterSelector from '../domain-page-cluster-selector/domain-page-cluster-selector';

export default function DomainPageHeaderInfo(props: Props) {
  return (
    <styled.DomainDetailsContainer>
      <DomainPageHeaderInfoItem
        title="Cluster"
        content={
          <DomainPageClusterSelector
            selectedCluster={props.cluster}
            availableClusters={props.domainInfo.clusters}
          />
        }
      />
      <DomainPageHeaderInfoItem
        title="Global/Local"
        content={props.domainInfo.isGlobalDomain ? 'Global' : 'Local'}
      />
      <DomainPageHeaderInfoItem
        title="Domain ID"
        content={props.domainInfo.id}
      />
    </styled.DomainDetailsContainer>
  );
}
