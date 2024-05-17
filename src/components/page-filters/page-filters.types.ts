import {
  PageQueryParamKeys,
  PageQueryParamSetter,
  PageQueryParamValues,
  PageQueryParams,
} from '@/hooks/use-page-query-params/use-page-query-params.types';
import type React from 'react';

export type PageFilterIsSetProps<T extends PageQueryParams> = {
  queryParams: PageQueryParamValues<T>;
};

export type PageFilterComponentProps<T extends PageQueryParams> = {
  queryParams: PageQueryParamValues<T>;
  setQueryParams: PageQueryParamSetter<T>;
};

export type PageFilterConfig<T extends PageQueryParams> = {
  id: PageQueryParamKeys<T>;
  component: React.ComponentType<PageFilterComponentProps<T>>;
  isSet: (props: PageFilterIsSetProps<T>) => boolean;
};

export interface Props<T extends PageQueryParams> {
  search: string;
  searchId: PageQueryParamKeys<T>;
  setSearch: (value: string) => void;
  searchPlaceholder: string;
  pageFiltersConfig: Array<PageFilterConfig<T>>;
  pageQueryParamsConfig: T;
}
