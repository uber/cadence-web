import { styled as createStyled } from 'baseui';

export const styled = {
  HeaderContent: createStyled('div', ({ $theme }) => ({
    marginTop: $theme.sizing.scale1000,
  })),
};
