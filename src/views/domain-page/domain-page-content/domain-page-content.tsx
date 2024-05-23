'use client';
import React from 'react';
import { Grid, Cell } from 'baseui/layout-grid';
import { notFound } from 'next/navigation';
import decodeUrlParams from '@/utils/decode-url-params';

import {
  type DomainPageContentParams,
  type Props,
} from './domain-page-content.types';
import { domainPageTabsContentConfig } from '../config/domain-page-tabs-content.config';

export default function DomainPageContent(props: Props) {
  const decodedParams = decodeUrlParams(
    props.params
  ) as DomainPageContentParams;
  const TabContent = domainPageTabsContentConfig[decodedParams.domainTab];

  if (!TabContent) {
    notFound();
  }

  return (
    <section>
      <Grid>
        <Cell span={12}>
          <TabContent
            domain={decodedParams.domain}
            cluster={decodedParams.cluster}
          />
        </Cell>
      </Grid>
    </section>
  );
}
