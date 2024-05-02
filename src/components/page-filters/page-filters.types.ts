import type React from 'react';

export type PageFilter = {
  component: React.ReactNode;
  isSet: boolean;
};

export type Props = {
  search: string;
  setSearch: (value: string) => void;
  searchPlaceholder: string;
  filters: Array<PageFilter>;
  resetAllFilters: () => void;
};
