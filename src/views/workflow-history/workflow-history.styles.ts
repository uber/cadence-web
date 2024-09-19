import { styled as createStyled, type Theme } from 'baseui';

import type {
  StyletronCSSObject,
  StyletronCSSObjectOf,
} from '@/hooks/use-styletron-classes';

export const styled = {
  VerticalDivider: createStyled<'div', { $hidden?: boolean }>(
    'div',
    ({ $theme, $hidden }: { $theme: Theme; $hidden?: boolean }) => ({
      ...$theme.borders.border200,
      borderColor: $theme.colors.borderOpaque,
      height: $hidden ? 0 : '100%',
      marginLeft: $theme.sizing.scale500,
    })
  ),
};

const cssStylesObj = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  eventsContainer: (theme) => ({
    display: 'flex',
    marginTop: theme.sizing.scale500,
    gap: '10px',
    overflow: 'hidden',
  }),
  compactSection: {
    display: 'flex',
    flexDirection: 'column',
    width: '370px',
    gap: '10px',
  },
  timelineSection: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingLeft: '32px',
    overflow: 'hidden',
  },
} satisfies StyletronCSSObject;

export const cssStyles: StyletronCSSObjectOf<typeof cssStylesObj> =
  cssStylesObj;
