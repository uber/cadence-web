import { type Theme } from 'baseui';
import type { SkeletonOverrides } from 'baseui/skeleton/types';
import type { StyleObject } from 'styletron-react';

export const overrides = {
  skeleton: {
    Row: {
      style: ({ $theme }: { $theme: Theme }): StyleObject => ({
        height: $theme.sizing.scale1600,
        width: '100%',
        marginBottom: $theme.sizing.scale700,
        flexBasis: 'auto',
        borderRadius: $theme.borders.radius200,
      }),
    },
  } satisfies SkeletonOverrides,
};
