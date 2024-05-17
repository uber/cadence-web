import React from 'react';
import { Button, KIND, SIZE } from 'baseui/button';
import { Search, Filter, Delete } from 'baseui/icon';
import { Input } from 'baseui/input';

import { Props } from './page-filters.types';
import { styled, overrides } from './page-filters.styles';
import {
  PageQueryParamKeys,
  PageQueryParamSetterValues,
  PageQueryParams,
} from '@/hooks/use-page-query-params/use-page-query-params.types';
import usePageQueryParams from '@/hooks/use-page-query-params/use-page-query-params';

export default function PageFilters<T extends PageQueryParams>({
  search,
  searchId,
  setSearch,
  searchPlaceholder,
  pageFiltersConfig,
  pageQueryParamsConfig,
}: Props<T>) {
  const [areFiltersShown, setAreFiltersShown] = React.useState(false);
  const [queryParams, setQueryParams] = usePageQueryParams(
    pageQueryParamsConfig,
    { pageRerender: false }
  );

  const activeFiltersCount = React.useMemo(
    () =>
      pageFiltersConfig.filter((pageFilter) =>
        pageFilter.isSet({
          pageQueryParamsValues: queryParams,
        })
      ).length,
    [pageFiltersConfig, queryParams]
  );

  const resetAllFilters = React.useCallback(() => {
    setQueryParams(
      pageQueryParamsConfig.reduce(
        (
          acc: Partial<
            PageQueryParamSetterValues<typeof pageQueryParamsConfig>
          >,
          config
        ) => {
          const queryParamKey: PageQueryParamKeys<
            typeof pageQueryParamsConfig
          > = config.key;
          if (queryParamKey !== searchId) {
            acc[queryParamKey] = undefined;
          }
          return acc;
        },
        {}
      )
    );
  }, [pageQueryParamsConfig, setQueryParams, searchId]);

  return (
    <styled.PageFiltersContainer>
      <styled.SearchInputContainer>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          startEnhancer={() => <Search />}
          clearOnEscape
          overrides={overrides.searchInput}
        />
        <Button
          kind={areFiltersShown ? KIND.primary : KIND.secondary}
          onClick={() => {
            setAreFiltersShown((value) => !value);
          }}
          startEnhancer={Filter}
          overrides={overrides.filtersButton}
        >
          {activeFiltersCount === 0
            ? 'Filters'
            : `Filters (${activeFiltersCount})`}
        </Button>
      </styled.SearchInputContainer>
      {areFiltersShown && (
        <styled.SearchFiltersContainer>
          {pageFiltersConfig?.map((filter) => {
            return (
              <styled.SearchFilterContainer key={filter.id}>
                <filter.component
                  pageQueryParamsConfig={pageQueryParamsConfig}
                />
              </styled.SearchFilterContainer>
            );
          })}
          <Button
            size={SIZE.compact}
            kind={KIND.tertiary}
            onClick={resetAllFilters}
            startEnhancer={Delete}
            overrides={overrides.clearFiltersButton}
          >
            Clear filters
          </Button>
        </styled.SearchFiltersContainer>
      )}
    </styled.PageFiltersContainer>
  );
}
