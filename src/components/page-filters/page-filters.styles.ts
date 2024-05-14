import { styled as createStyled, type Theme } from 'baseui';
import type { ButtonOverrides } from 'baseui/button';
import { type StyleObject } from 'styletron-react';

export const styled = {
  PageFiltersContainer: createStyled('div', {
    width: '100%',
    alignSelf: 'center',
  }),
  SearchInputContainer: createStyled(
    'div',
    ({ $theme }: { $theme: Theme }) => ({
      display: 'flex',
      gap: $theme.sizing.scale500,
      paddingBottom: $theme.sizing.scale500,
    })
  ),
  SearchFiltersContainer: createStyled(
    'div',
    ({ $theme }: { $theme: Theme }) => ({
      display: 'flex',
      justifyContent: 'stretch',
      gap: $theme.sizing.scale500,
    })
  ),
  SearchFilterContainer: createStyled('div', {
    flexGrow: 2,
    flexBasis: 0,
  }),
};

export const overrides = {
  filtersButton: {
    Root: {
      style: {
        whiteSpace: 'nowrap',
      },
    },
  } satisfies ButtonOverrides,
  clearFiltersButton: {
    Root: {
      style: ({ $theme }: { $theme: Theme }): StyleObject => ({
        whiteSpace: 'nowrap',
        alignSelf: 'flex-end',
        marginBottom: $theme.sizing.scale600,
        height: $theme.sizing.scale1200,
      }),
    },
  } satisfies ButtonOverrides,
};
