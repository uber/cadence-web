import { styled as createStyled, type Theme } from 'baseui';
import type { StyleObject } from 'styletron-react';

export const styled = {
  ContentContainer: createStyled(
    'div',
    ({ $theme }: { $theme: Theme }): StyleObject => ({
      display: 'flex',
      flexDirection: 'column',
      marginTop: $theme.sizing.scale900,
      marginBottom: $theme.sizing.scale900,
    })
  ),
};
