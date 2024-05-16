import React from 'react';
import { Button, KIND, SIZE } from 'baseui/button';
import { Search, Filter, Delete } from 'baseui/icon';
import { Input } from 'baseui/input';

import { Props } from './page-filters.types';
import { styled, overrides } from './page-filters.styles';
import { PageQueryParamSetterValues, PageQueryParams } from '@/hooks/use-page-query-params/use-page-query-params.types';
import usePageQueryParams from '@/hooks/use-page-query-params/use-page-query-params';

// Approach: directly pass pagequeryparamsconfig as a generic type
// Then pass the config along to each filter component to render it
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

  const activeFiltersCount = React.useMemo(() => {
    pageFiltersConfig.reduce((countSoFar: number, pageFilter) => {
      if (pageFilter.isSet({pageQueryParamsConfig: pageQueryParamsConfig, pageQueryParamsValues: queryParams})) {
        countSoFar += 1
      }
      return countSoFar;
    }, 0)
  }, [pageFiltersConfig, pageQueryParamsConfig, queryParams]);

  const resetAllFilters = React.useCallback(() => {
    // Clear all query params except search
    setQueryParams(pageQueryParamsConfig.reduce((acc, config) => {
      acc[config.key] = undefined;
      return acc;
    }, {}));
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
