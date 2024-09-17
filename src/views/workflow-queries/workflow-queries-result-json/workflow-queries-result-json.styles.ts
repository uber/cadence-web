import { styled as createStyled } from 'baseui';

export const styled = {
  ViewContainer: createStyled('div', ({ $theme }) => ({
    padding: $theme.sizing.scale600,
    backgroundColor: $theme.colors.backgroundSecondary,
    borderRadius: $theme.borders.radius300,
  })),
  ViewHeader: createStyled('div', ({ $theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    gap: $theme.sizing.scale600,
    marginBottom: $theme.sizing.scale700,
  })),
};
