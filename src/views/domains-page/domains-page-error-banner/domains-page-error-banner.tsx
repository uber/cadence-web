'use client';
import React from 'react';

import { Banner, KIND, HIERARCHY } from 'baseui/banner';
import { MdWarning } from 'react-icons/md';

import PageSection from '@/components/page-section/page-section';

import { overrides } from './domains-page-error-banner.styles';
import { type Props } from './domains-page-error-banner.types';

export default function DomainsPageErrorBanner({ failedClusters }: Props) {
  if (failedClusters.length === 0) return null;

  return (
    <PageSection>
      <Banner
        hierarchy={HIERARCHY.low}
        kind={KIND.negative}
        artwork={{ icon: MdWarning }}
        overrides={overrides.banner}
      >
        Failed to fetch domains for following clusters:{' '}
        {failedClusters.join(', ')}
      </Banner>
    </PageSection>
  );
}
