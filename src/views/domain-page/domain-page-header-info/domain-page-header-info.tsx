'use client';
import React from 'react';

import { styled } from './domain-page-header-info.styles';
import { Props } from './domain-page-header-info.types';
import domainPageHeaderInfoItemsConfig from '../config/domain-page-header-info-items.config';
import DomainPageHeaderInfoItem from '../domain-page-header-info-item/domain-page-header-info-item';

export default function DomainPageHeaderInfo(props: Props) {
  return (
    <styled.DomainDetailsContainer>
      {domainPageHeaderInfoItemsConfig.map((configItem) => (
        <DomainPageHeaderInfoItem
          key={configItem.title}
          title={configItem.title}
          content={
            props.loading ? (
              <styled.Spinner aria-label="loading-spinner" />
            ) : (
              configItem.getContent({
                domainInfo: props.domainInfo,
                cluster: props.cluster,
              })
            )
          }
        />
      ))}
    </styled.DomainDetailsContainer>
  );
}
