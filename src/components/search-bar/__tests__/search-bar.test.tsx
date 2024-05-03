import React from 'react';
import { render, screen, act, fireEvent } from '@/test-utils/rtl';

import SearchBar from '../search-bar';

const MockComboboxFilter = ({
  options,
  value,
  setValue,
}: {
  options: Array<string>;
  value: string;
  setValue: (v: string) => void;
}) => {
  return (
    <div>
      <div>Value: {value}</div>
      <div data-testid="change-filters" onClick={() => setValue(options[1])} />
    </div>
  );
};

const setSearchFilters = jest.fn();
const MOCK_FILTERS_PROPS = [
  {
    id: 'filter1',
    label: 'Filter 1',
    options: ['value 1', 'value 2'],
    value: 'value 1',
    setValue: (v: string) => setSearchFilters({ filter1: v }),
    defaultValue: 'value 1',
  },
  {
    id: 'filter2',
    label: 'Filter 2',
    options: ['value 3', 'value 4'],
    value: 'value 3',
    setValue: (v: string) => setSearchFilters({ filter2: v }),
    defaultValue: 'value 3',
  },
];

afterEach(() => {
  jest.clearAllMocks();
});

describe('SearchBar', () => {
  it('should render search bar correctly and call setSearch on input change', async () => {
    const { setSearch } = setup({});

    const searchInput = await screen.findByRole('textbox');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'test-search' } });
    });

    expect(setSearch).toHaveBeenCalledWith('test-search');
  });

  it('should show filters when Filters button is clicked, and modify additional filters', async () => {
    setup({});

    const filtersButton = await screen.findByText('Filters');

    act(() => {
      fireEvent.click(filtersButton);
    });

    const filtersButtons = await screen.findAllByTestId('change-filters');
    expect(filtersButtons).toHaveLength(2);

    act(() => {
      fireEvent.click(filtersButtons[0]);
    });

    expect(setSearchFilters).toHaveBeenCalledWith({ filter1: 'value 2' });
  });

  it('should call resetFilters when clear filters button is pressed', async () => {
    const { resetAllFilters } = setup({
      valuesOverrides: ['value 2', 'value 4'],
    });

    const filtersButton = await screen.findByText('Filters (2)');

    act(() => {
      fireEvent.click(filtersButton);
    });

    const clearFiltersButton = await screen.findByText('Clear filters');

    act(() => {
      fireEvent.click(clearFiltersButton);
    });

    expect(resetAllFilters).toHaveBeenCalled();
  });
});

function setup({ valuesOverrides }: { valuesOverrides?: Array<string> }) {
  const setSearch = jest.fn();
  const resetAllFilters = jest.fn();

  render(
    <SearchBar
      search=""
      setSearch={setSearch}
      placeholder="placeholder"
      searchFilters={MOCK_FILTERS_PROPS.map((filter, idx) => {
        const filterValue = valuesOverrides?.[idx] ?? filter.value;
        return {
          component: (
            <MockComboboxFilter
              options={filter.options}
              value={filterValue}
              setValue={filter.setValue}
            />
          ),
          isSet: Boolean(filterValue) && filterValue !== filter.defaultValue,
        };
      })}
      resetAllFilters={resetAllFilters}
    />
  );

  return {
    setSearch,
    resetAllFilters,
  };
}
