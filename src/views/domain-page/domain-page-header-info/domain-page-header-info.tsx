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
          {...(props.loading
            ? {
                loading: true,
                placeholderSize: configItem.placeholderSize,
              }
            : {
                loading: false,
                content: configItem.getContent({
                  domainInfo: props.domainInfo,
                  cluster: props.cluster,
                }),
              })}
        />
      ))}
    </styled.DomainDetailsContainer>
  );
}
