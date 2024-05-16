'use client';
import React from 'react';
import PageTabs from '@/components/page-tabs/page-tabs';
import domainPageTabsConfig from '../config/domain-page-tabs.config';
import type { Props, DomainPageTabsParams } from './domain-page-tabs.types';
import { useRouter } from 'next/navigation';

export default function DomainPageTabs(props: Props) {
  const router = useRouter();
  return (
    <PageTabs
      selectedTab={props.decodedParams.domainTab}
      tabList={domainPageTabsConfig}
      setSelectedTab={(newTab) => {
        router.push('/metadata');
      }}
    />
  );
}
