'use client';
import React from 'react';
import { Cell, Grid } from 'baseui/layout-grid';

import { styled } from './page-header-section.styles';
import { Props } from './page-header-section.types';

export default function PageHeaderSection(props: Props) {
  return (
    <section>
      <Grid>
        <Cell span={12}>
          <styled.HeaderContent>{props.children}</styled.HeaderContent>
        </Cell>
      </Grid>
    </section>
  );
}
