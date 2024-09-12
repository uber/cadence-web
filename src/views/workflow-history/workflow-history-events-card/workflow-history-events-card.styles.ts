import { type Theme } from 'baseui';
import { type AccordionOverrides } from 'baseui/accordion';
import { type StyleObject } from 'styletron-react';

import type {
  StyletronCSSObject,
  StyletronCSSObjectOf,
} from '@/hooks/use-styletron-classes';

export const overrides = {
  accordion: {
    Root: {
      style: ({ $theme }: { $theme: Theme }): StyleObject => ({
        ...$theme.borders.border100,
        borderRadius: $theme.borders.radius300,
        overflow: 'hidden',
      }),
    },
    Header: {
      style: ({ $theme }: { $theme: Theme }): StyleObject => ({
        gap: $theme.sizing.scale500,
        paddingTop: $theme.sizing.scale400,
        paddingRight: $theme.sizing.scale600,
        paddingBottom: $theme.sizing.scale400,
        paddingLeft: $theme.sizing.scale500,
      }),
    },
    ToggleIcon: {
      style: ({
        $theme,
        $disabled,
      }: {
        $theme: Theme;
        $disabled: boolean;
      }): StyleObject => ({
        height: $theme.sizing.scale600,
        width: $theme.sizing.scale600,
        opacity: $disabled ? 0 : undefined,
      }),
    },
    PanelContainer: {
      style: {
        ':last-child': {
          borderBottomWidth: 0,
        },
      },
    },
  } satisfies AccordionOverrides,
};

const cssStylesObj = {
  eventLabel: ($theme: Theme) => ({
    ...$theme.typography.LabelSmall,
    color: $theme.colors.contentPrimary,
    flex: 1,
  }),
  skeletonContainer: ($theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: $theme.sizing.scale500,
  }),
} satisfies StyletronCSSObject;

export const cssStyles: StyletronCSSObjectOf<typeof cssStylesObj> =
  cssStylesObj;
