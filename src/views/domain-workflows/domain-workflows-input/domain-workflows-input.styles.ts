import { styled as createStyled, type Theme } from 'baseui';

export const styled = {
  InputContainer: createStyled('div', ({ $theme }: { $theme: Theme }) => ({
    marginTop: $theme.sizing.scale950,
    marginBottom: $theme.sizing.scale900,
    display: 'flex',
    columnGap: $theme.sizing.scale500,
  })),
};
