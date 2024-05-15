import React from 'react';
import { Button, KIND, SIZE } from 'baseui/button';
import { Search, Filter, Delete } from 'baseui/icon';
import { Input } from 'baseui/input';

import { Props } from './page-filters.types';
import { styled, overrides } from './page-filters.styles';
import { PageQueryParams } from '@/hooks/use-page-query-params/use-page-query-params.types';
import usePageQueryParams from '@/hooks/use-page-query-params/use-page-query-params';

// Approach: directly pass pagequeryparamsconfig as a generic type
// Then pass the config along to each filter component to render it
export default function PageFilters<T extends PageQueryParams>({
  search,
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

  const activeFiltersCount = React.useMemo(() => {
    const configsByKey = Object.fromEntries(
      pageQueryParamsConfig.map((c) => [c.key, c])
    );
    return pageFiltersConfig.filter((filter) =>
      filter.queryParamsUsedKeys.some(
        (queryParamKey) =>
          queryParams[queryParamKey] &&
          queryParams[queryParamKey] !==
            configsByKey[queryParamKey].defaultValue
      )
    ).length;
  }, [pageFiltersConfig, pageQueryParamsConfig, queryParams]);

  const resetAllFilters = React.useCallback(() => {
    const emptyFiltersKeyValueEntries = pageFiltersConfig.flatMap(
      (pageFilter) =>
        pageFilter.queryParamsUsedKeys.map((queryParamKey) => [
          queryParamKey,
          undefined,
        ])
    );
    setQueryParams(Object.fromEntries(emptyFiltersKeyValueEntries));
    setSearch('');
  }, [pageFiltersConfig, setQueryParams, setSearch]);

  return (
    <styled.PageFiltersContainer>
      <styled.SearchInputContainer>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          startEnhancer={() => <Search />}
          clearOnEscape
        />
        <Button
          kind={areFiltersShown ? KIND.primary : KIND.secondary}
          onClick={() => {
            setAreFiltersShown((value) => !value);
          }}
          endEnhancer={Filter}
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
