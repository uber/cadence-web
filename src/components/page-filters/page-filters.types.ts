import {
  PageQueryParamKeys,
  PageQueryParams,
} from '@/hooks/use-page-query-params/use-page-query-params.types';
import type React from 'react';

// Is there a way to assert that the component uses only the given page query params?
export type PageFilterComponentProps<T extends PageQueryParams> = {
  pageQueryParamsConfig: T;
};

export type PageFilterConfig<T extends PageQueryParams> = {
  id: PageQueryParamKeys<T>;
  component: React.ComponentType<PageFilterComponentProps<T>>;
  queryParamsUsedKeys: Array<PageQueryParamKeys<T>>;
};

export interface Props<T extends PageQueryParams> {
  search: string;
  setSearch: (value: string) => void;
  searchPlaceholder: string;
  pageFiltersConfig: Array<PageFilterConfig<T>>;
  pageQueryParamsConfig: T;
}
