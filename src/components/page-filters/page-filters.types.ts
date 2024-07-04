import {
  type PageQueryParamSetter,
  type PageQueryParamKeys,
  type PageQueryParamValues,
  type PageQueryParams,
} from '@/hooks/use-page-query-params/use-page-query-params.types';

export type PageFilterComponentProps<
  P extends PageQueryParams,
  V extends Partial<PageQueryParamValues<P>>,
> = {
  value: V;
  setValue: PageQueryParamSetter<P>;
};

export type PageFilterConfig<
  P extends PageQueryParams,
  V extends Partial<PageQueryParamValues<P>>,
> = {
  id: string;
  getValue: (queryParamsValues: PageQueryParamValues<P>) => V;
  component: React.ComponentType<PageFilterComponentProps<P, V>>;
};

export type Props<
  P extends PageQueryParams,
  K extends PageQueryParamKeys<P>,
> = {
  searchQueryParamKey: PageQueryParamValues<P>[K] extends string ? K : never;
  searchPlaceholder: string;
  pageQueryParamsConfig: P;
  pageFiltersConfig: Array<PageFilterConfig<P, any>>;
};
