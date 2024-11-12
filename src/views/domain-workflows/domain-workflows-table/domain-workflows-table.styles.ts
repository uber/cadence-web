import { styled as createStyled, withStyle } from 'baseui';

import PageSection from '@/components/page-section/page-section';

export const styled = {
  TableContainer: createStyled('div', {
    overflowX: 'auto',
  }),
  PageSection: withStyle(PageSection, () => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  })),
  ErrorPanelContainer: createStyled('div', ({ $theme }) => ({
    padding: `${$theme.sizing.scale1200} 0px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })),
};
