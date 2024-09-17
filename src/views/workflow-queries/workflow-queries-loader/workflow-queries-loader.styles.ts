import { styled as createStyled } from 'baseui';

export const styled = {
  PageContainer: createStyled('div', ({ $theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    columnGap: $theme.sizing.scale900,
  })),
  QueriesSidebar: createStyled('div', ({ $theme }) => ({
    flex: '1 0 300px',
    maxWidth: '450px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: $theme.sizing.scale600,
  })),
  QueryResultView: createStyled('div', {
    flex: '1 0 300px',
  }),
};
