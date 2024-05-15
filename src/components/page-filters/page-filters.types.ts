import {
  PageQueryParamKeys,
  PageQueryParamValues,
  PageQueryParams,
} from '@/hooks/use-page-query-params/use-page-query-params.types';
import type React from 'react';

type FilterIsSetProps<T extends PageQueryParams> = {
  pageQueryParams: PageQueryParamValues<T>;
  pageQueryParamsConfig: T;
};

export type PageFilterConfig<T extends PageQueryParams> = {
  id: PageQueryParamKeys<T>;
  component: React.ComponentType<{
    pageQueryParamsConfig: T;
  }>;
  isSet: (props: FilterIsSetProps<T>) => boolean;
};

export interface Props<T extends PageQueryParams> {
  search: string;
  setSearch: (value: string) => void;
  searchPlaceholder: string;
  pageFiltersConfig: Array<PageFilterConfig<T>>;
  pageQueryParamsConfig: T;
  resetAllFilters: () => void;
}
