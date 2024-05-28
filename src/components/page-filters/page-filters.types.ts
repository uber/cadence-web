import {
  PageQueryParamKeys,
  PageQueryParamSetter,
  PageQueryParamValues,
  PageQueryParams,
} from '@/hooks/use-page-query-params/use-page-query-params.types';

export type PageFilterComponentProps<
  P extends PageQueryParams,
  Q extends Array<PageQueryParamKeys<P>>,
> = {
  queryParamKeys: Q;
  queryParams: PageQueryParamValues<P>;
  setQueryParams: PageQueryParamSetter<P>;
};

export type PageFilterConfig<
  P extends PageQueryParams,
  Q extends Array<PageQueryParamKeys<P>>,
> = {
  id: string;
  queryParamKeys: Q;
  component: React.ComponentType<PageFilterComponentProps<P, Q>>;
};

export type Props<
  P extends PageQueryParams,
  K extends PageQueryParamKeys<P>,
> = {
  searchQueryParamKey: PageQueryParamValues<P>[K] extends string ? K : never;
  searchPlaceholder: string;
  pageQueryParamsConfig: P;
  pageFiltersConfig: Array<PageFilterConfig<P, Array<PageQueryParamKeys<P>>>>;
};
