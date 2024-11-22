import { type SortOrder } from '@/utils/sort-by';

export type TableColumn<T> = {
  name: string;
  id: string;
  renderCell: React.ComponentType<T> | ((row: T) => React.ReactNode);
  width: string;
  sortable?: boolean;
};

type IsTableConfigSortable<T, C extends Array<TableColumn<T>>> = true extends {
  [K in keyof C]: C[K] extends { sortable: true } ? true : false;
}[number]
  ? true
  : false;

export type Props<T, C extends Array<TableColumn<T>>> = {
  data: Array<T>;
  columns: C;
  shouldShowResults: boolean;
  endMessage: React.ReactNode;
  // Sort params
  onSort: IsTableConfigSortable<T, C> extends true
    ? (column: string) => void
    : never;
  sortColumn?: string;
  sortOrder?: SortOrder;
};
