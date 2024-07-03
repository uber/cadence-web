import { type Theme, styled as createStyled } from 'baseui';
import { type StyleObject } from 'styletron-react';

export const styled = {
  FieldContainer: createStyled(
    'div',
    ({ $theme }: { $theme: Theme }): StyleObject => ({
      display: 'flex',
      gap: $theme.sizing.scale1200,
      paddingBottom: $theme.sizing.scale800,
    })
  ),
  Info: createStyled(
    'div',
    ({ $theme }: { $theme: Theme }): StyleObject => ({
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
      gap: $theme.sizing.scale200,
    })
  ),
  Title: createStyled(
    'div',
    ({ $theme }: { $theme: Theme }): StyleObject => ({
      ...$theme.typography.LabelSmall,
      color: $theme.colors.contentPrimary,
    })
  ),
  Description: createStyled(
    'div',
    ({ $theme }: { $theme: Theme }): StyleObject => ({
      ...$theme.typography.LabelXSmall,
      color: $theme.colors.contentTertiary,
      fontWeight: '400',
    })
  ),
};
