import React from 'react';
import { Button, KIND, SIZE } from 'baseui/button';
import { Search, Filter, Delete } from 'baseui/icon';
import { Input } from 'baseui/input';

import { Props } from './page-filters.types';
import { styled, overrides } from './page-filters.styles';

export default function PageFilters({
  search,
  setSearch,
  searchPlaceholder,
  filters,
  resetAllFilters,
}: Props) {
  const [areFiltersShown, setAreFiltersShown] = React.useState(false);
  const activeFiltersCount = React.useMemo(
    () => filters.filter((filter) => filter.isSet).length,
    [filters]
  );

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
        <styled.FiltersContainer>
          {filters?.map((filter, index) => {
            return (
              <styled.FilterContainer key={index}>
                {filter.component}
              </styled.FilterContainer>
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
        </styled.FiltersContainer>
      )}
    </styled.PageFiltersContainer>
  );
}
