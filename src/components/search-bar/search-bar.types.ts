import type React from 'react';

export type SearchFilter = {
  component: React.ReactNode;
  isSet: boolean;
};

export type Props = {
  search: string;
  setSearch: (value: string) => void;
  placeholder: string;
  searchFilters: Array<SearchFilter>;
  resetAllFilters: () => void;
};
