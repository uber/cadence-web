import { ComponentProps } from 'react';
import type { StyleObject } from 'styletron-react';
import type { Theme } from 'baseui';
import {
  type SegmentOverrides,
  type SegmentedControlOverrides,
  StyledSegment,
  StyledActive,
} from 'baseui/segmented-control';

export const overrides = {
  segmentedControl: {
    Root: {
      style: ({ $theme }: { $theme: Theme }): StyleObject => ({
        padding: 0,
        borderRadius: '23px',
      }),
    },
    SegmentList: {
      style: ({ $theme }: { $theme: Theme }): StyleObject => ({
        background: $theme.colors.backgroundTertiary,
        minHeight: '24px',
      }),
    },
    Active: {
      style: ({
        $theme,
        $length,
      }: { $theme: Theme } & ComponentProps<
        typeof StyledActive
      >): StyleObject => ({
        borderRadius: '23px',
        opacity: $length === 0 ? 0 : 1,
        background: $theme.colors.backgroundInversePrimary,
      }),
    },
  } satisfies SegmentedControlOverrides,
  segment: {
    Label: {
      style: ({ $theme }: { $theme: Theme }): StyleObject => ({
        animationDuration: $theme.animation.timing900,
      }),
    },
    Segment: {
      style: ({
        $theme,
        $isActive,
      }: { $theme: Theme } & ComponentProps<
        typeof StyledSegment
      >): StyleObject => ({
        color: $isActive ? $theme.colors.contentInversePrimary : '#A6A6A6',
        transitionProperty: 'color',
        transitionDelay: $theme.animation.timing200,
        borderRadius: '23px',
      }),
    },
  } satisfies SegmentOverrides,
};
