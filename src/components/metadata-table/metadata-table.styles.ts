import { type Theme, styled as createStyled } from 'baseui';
import { type StyleObject } from 'styletron-react';

export const styled = {
  MetadataRow: createStyled(
    'div',
    ({ $theme }: { $theme: Theme }): StyleObject => ({
      ':not(:last-child)': {
        borderBottom: `1px solid ${$theme.colors.borderOpaque}`,
      },
      display: 'flex',
      flexDirection: 'row',
      gap: $theme.sizing.scale300,
      flexWrap: 'wrap',
      paddingTop: $theme.sizing.scale400,
      paddingBottom: $theme.sizing.scale400,
      wordBreak: 'break-word',
    })
  ),
  MetadataItemLabel: createStyled(
    'div',
    ({ $theme }: { $theme: Theme }): StyleObject => ({
      minWidth: '120px',
      maxWidth: '120px',
      display: 'flex',
      ...$theme.typography.LabelXSmall,
      lineHeight: $theme.typography.ParagraphXSmall.lineHeight,
    })
  ),
  MetadataItemValue: createStyled(
    'div',
    ({ $theme }: { $theme: Theme }): StyleObject => ({
      ...$theme.typography.ParagraphXSmall,
      display: 'flex',
      flex: '1 0 300px',
    })
  ),
};
