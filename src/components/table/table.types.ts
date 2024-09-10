import { type SortOrder } from '@/utils/sort-by';

export type TableColumn<T> = {
  name: string;
  id: string;
  renderCell: React.ComponentType<T> | ((row: T) => React.ReactNode);
  width: string;
  sortable?: boolean;
};

export type Props<T> = {
  data: Array<T>;
  columns: Array<TableColumn<T>>;
  shouldShowResults: boolean;
  endMessage: React.ReactNode;
  // Sort params
  onSort: (column: string) => void;
  sortColumn?: string;
  sortOrder?: SortOrder;
};