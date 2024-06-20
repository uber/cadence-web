import * as React from 'react';

import { Skeleton } from 'baseui/skeleton';

import { overrides } from './table-loading-rows.styles';
import { type Props } from './table-loading-rows.types';

export default function TableLoadingRows({ numRows }: Props) {
  return (
    <Skeleton
      width="100%"
      rows={numRows}
      animation={true}
      overrides={overrides.skeleton}
    />
  );
}
