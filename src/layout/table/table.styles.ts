import { styled, withStyle } from 'baseui';
import {
  StyledRoot,
  StyledTableHeadCell,
  StyledTableHeadCellSortable,
  StyledTableBodyCell,
  StyledTableLoadingMessage,
} from 'baseui/table-semantic';

export const components = {
  TableRoot: withStyle(StyledRoot, {
    alignSelf: 'center',
    flex: '1 1 0',
    overflow: 'visible',
    width: '100%',
  }),
  SortableHeaderContainer: styled('div', ({ $theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: $theme.sizing.scale300,
  })),
  TableMessage: withStyle(StyledTableLoadingMessage, {
    display: 'flex',
    justifyContent: 'center',
  }),
  TableHeadCell: withStyle<typeof StyledTableHeadCell, { $width: string }>(
    StyledTableHeadCell,
    ({ $theme, $width }) => ({
      ...$theme.typography.LabelXSmall,
      width: $width,
      color: '#5E5E5E',
    })
  ),
  TableHeadCellSortable: withStyle<
    typeof StyledTableHeadCellSortable,
    { $width: string }
  >(StyledTableHeadCellSortable, ({ $theme, $width }) => ({
    ...$theme.typography.LabelXSmall,
    width: $width,
    color: '#5E5E5E',
  })),
  TableBodyCell: withStyle<typeof StyledTableBodyCell, { $width: string }>(
    StyledTableBodyCell,
    ({ $width }) => ({
      width: $width,
      wordBreak: 'break-word',
    })
  ),
};
