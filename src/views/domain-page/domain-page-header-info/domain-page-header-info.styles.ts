import { styled as createStyled, withStyle } from 'baseui';
import { Spinner } from 'baseui/spinner';

export const styled = {
  DomainDetailsContainer: createStyled('div', ({ $theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    columnGap: $theme.sizing.scale850,
  })),
  Spinner: withStyle(Spinner, ({ $theme }) => ({
    width: $theme.sizing.scale600,
    height: $theme.sizing.scale600,
    marginTop: $theme.sizing.scale400,
    borderWidth: '3px',
  })),
};
