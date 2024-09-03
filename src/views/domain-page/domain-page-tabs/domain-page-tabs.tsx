'use client';
import React from 'react';

import { useRouter, useParams, useSearchParams } from 'next/navigation';

import PageTabs from '@/components/page-tabs/page-tabs';
import decodeUrlParams from '@/utils/decode-url-params';

import domainPageTabsConfig from '../config/domain-page-tabs.config';

import { styled } from './domain-page-tabs.styles';
import type { DomainPageTabsParams } from './domain-page-tabs.types';

export default function DomainPageTabs() {
  const router = useRouter();
  const params = useParams<DomainPageTabsParams>();
  const decodedParams = decodeUrlParams(params) as DomainPageTabsParams;
  const queryParams = useSearchParams();

  return (
    <styled.PageTabsContainer>
      <PageTabs
        selectedTab={decodedParams.domainTab}
        tabList={domainPageTabsConfig}
        setSelectedTab={(newTab) => {
          router.push(
            `${encodeURIComponent(newTab.toString())}?${queryParams.toString()}`
          );
        }}
      />
    </styled.PageTabsContainer>
  );
}
