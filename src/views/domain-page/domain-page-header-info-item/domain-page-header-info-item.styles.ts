import { styled as createStyled } from 'baseui';

export const styled = {
  ItemTitle: createStyled('div', ({ $theme }) => ({
    ...$theme.typography.LabelXSmall,
    color: $theme.colors.contentTertiary,
  })),
  ItemLabel: createStyled('div', ({ $theme }) => ({
    ...$theme.typography.LabelXSmall,
    color: $theme.colors.contentPrimary,
    paddingTop: $theme.sizing.scale400,
  })),
  ItemContainer: createStyled('div', ({ $theme }) => ({
    display: 'flex',
    flexDirection: 'column',
  })),
};
