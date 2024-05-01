import { styled as createStyled } from 'baseui';

export const styled = {
  DomainInfoContainer: createStyled('div', ({ $theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: $theme.sizing.scale500,
  })),
  DomainNameLabel: createStyled('div', ({ $theme }) => ({
    ...$theme.typography.HeadingSmall,
  })),
};
