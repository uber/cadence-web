'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useStyletronClasses from '@/hooks/use-styletron-classes';
import { Breadcrumbs } from 'baseui/breadcrumbs';
import { StyledLink } from 'baseui/link';
import cadenceLogoBlack from '@/assets/cadence-logo-black.svg';
import { cssStyles, overrides } from './workflow-page-header.styles';
import type { Props } from './workflow-page-header.types';
import PageSection from '@/components/page-section/page-section';

export default function WorkflowPageHeader({
  domain,
  workflowId,
  runId,
  cluster,
  workflowStatusTag,
}: Props) {
  const { cls } = useStyletronClasses(cssStyles);
  return (
    <PageSection>
      <Breadcrumbs
        overrides={overrides.breadcrumbs}
        showTrailingSeparator={false}
      >
        <div className={cls.breadcrumbItemContainer}>
          <Image
            width={22}
            height={22}
            alt="Cadence Icon"
            src={cadenceLogoBlack}
          />
          <StyledLink
            $as={Link}
            href={`/domains/${encodeURIComponent(domain)}/${encodeURIComponent(cluster)}`}
          >
            {domain}
          </StyledLink>
        </div>
        {/** TODO: @assem.hafez change those to actual links */}
        <StyledLink $as={Link} href="#">
          {workflowId}
        </StyledLink>
        <div className={cls.breadcrumbItemContainer}>
          {runId}
          {workflowStatusTag}
        </div>
      </Breadcrumbs>
    </PageSection>
  );
}
