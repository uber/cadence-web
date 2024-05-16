import {
  PageQueryParamKeys,
  PageQueryParamValues,
  PageQueryParams,
} from '@/hooks/use-page-query-params/use-page-query-params.types';
import type React from 'react';

export type PageFilterIsSetProps<T extends PageQueryParams> = {
  pageQueryParamsConfig: T;
  pageQueryParamsValues: PageQueryParamValues<T>;
}

// Is there a way to assert that the component uses only the given page query params?
export type PageFilterComponentProps<T extends PageQueryParams> = {
  pageQueryParamsConfig: T;
};

export type PageFilterConfig<T extends PageQueryParams> = {
  id: PageQueryParamKeys<T>;
  component: React.ComponentType<PageFilterComponentProps<T>>;
  isSet: (props: PageFilterIsSetProps<T>) => boolean
};

export interface Props<T extends PageQueryParams> {
  search: string;
  searchId: PageQueryParamKeys<T>;
  setSearch: (value: string) => void;
  searchPlaceholder: string;
  pageFiltersConfig: Array<PageFilterConfig<T>>;
  pageQueryParamsConfig: T;
}
