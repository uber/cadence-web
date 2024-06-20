import type {
  StyletronCSSObject,
  StyletronCSSObjectOf,
} from '@/hooks/use-styletron-classes';

const cssStylesObj = {
  pageContainer: (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.sizing.scale500,
  }),
  detailsRow: (theme) => ({
    ':not(:last-child)': {
      borderBottom: `1px solid ${theme.colors.borderOpaque}`,
    },
    display: 'flex',
    flexDirection: 'row',
    gap: theme.sizing.scale300,
    flexWrap: 'wrap',
    paddingTop: theme.sizing.scale400,
    paddingBottom: theme.sizing.scale400,
    wordBreak: 'break-word',
  }),
  detailsLabel: (theme) => ({
    minWidth: '120px',
    maxWidth: '120px',
    display: 'flex',
  }),
  detailsValue: (theme) => ({
    ...theme.typography.ParagraphXSmall,
    display: 'flex',
    flex: '1 0 300px',
  }),
} satisfies StyletronCSSObject;

export const cssStyles: StyletronCSSObjectOf<typeof cssStylesObj> =
  cssStylesObj;
