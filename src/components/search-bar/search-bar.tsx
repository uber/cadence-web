import React from 'react';
import { Button, KIND, SIZE } from 'baseui/button';
import { Search, Filter, Delete } from 'baseui/icon';
import { Input } from 'baseui/input';

import { Props } from './search-bar.types';
import { styled, overrides } from './search-bar.styles';

export default function SearchBar({
  search,
  setSearch,
  placeholder,
  searchFilters,
  resetAllFilters,
}: Props) {
  const [areFiltersShown, setAreFiltersShown] = React.useState(false);
  const activeFiltersCount = React.useMemo(
    () => searchFilters.filter((filter) => filter.isSet).length,
    [searchFilters]
  );

  return (
    <styled.SearchBarContainer>
      <styled.SearchInputContainer>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
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
          {searchFilters?.map((filter, index) => {
            return (
              <styled.SearchFilterContainer key={index}>
                {filter.component}
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
    </styled.SearchBarContainer>
  );
}
