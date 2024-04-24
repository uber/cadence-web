import { styled, withStyle } from 'baseui';
import { StyledTableHeadCellSortable } from 'baseui/table-semantic';

export const components = {
  SortableHeaderContainer: styled('div', ({ $theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: $theme.sizing.scale300,
  })),
  TableSortableHeadCellRoot: withStyle<
    typeof StyledTableHeadCellSortable,
    { $width: string }
  >(StyledTableHeadCellSortable, ({ $theme, $width }) => ({
    ...$theme.typography.LabelXSmall,
    width: $width,
    color: '#5E5E5E',
  })),
};
