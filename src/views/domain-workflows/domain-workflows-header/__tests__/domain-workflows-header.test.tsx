import { render, screen, userEvent } from '@/test-utils/rtl';

import * as usePageFiltersModule from '@/components/page-filters/hooks/use-page-filters';
import { type Props as PageFiltersToggleProps } from '@/components/page-filters/page-filters-toggle/page-filters-toggle.types';

import { mockDomainPageQueryParamsValues } from '../../../domain-page/__fixtures__/domain-page-query-params';
import DomainWorkflowsHeader from '../domain-workflows-header';

jest.mock(
  '@/components/page-filters/page-filters-search/page-filters-search',
  () => jest.fn(() => <div>Filter search</div>)
);

jest.mock(
  '@/components/page-filters/page-filters-fields/page-filters-fields',
  () => jest.fn(() => <div>Filter fields</div>)
);

jest.mock(
  '@/components/page-filters/page-filters-toggle/page-filters-toggle',
  () =>
    jest.fn((props: PageFiltersToggleProps) => (
      <button onClick={props.onClick}>Filter toggle</button>
    ))
);

jest.mock(
  '../../domain-workflows-query-input/domain-workflows-query-input',
  () => jest.fn(() => <div>Query input</div>)
);

const mockSetQueryParams = jest.fn();
const mockResetAllFilters = jest.fn();
const mockActiveFiltersCount = 2;
jest.mock('@/components/page-filters/hooks/use-page-filters', () =>
  jest.fn(() => ({
    resetAllFilters: mockResetAllFilters,
    activeFiltersCount: mockActiveFiltersCount,
    queryParams: mockDomainPageQueryParamsValues,
    setQueryParams: mockSetQueryParams,
  }))
);

jest.mock('../../hooks/use-list-workflows', () =>
  jest.fn(() => ({
    refetch: jest.fn(),
  }))
);

describe(DomainWorkflowsHeader.name, () => {
  it('renders segmented control', async () => {
    render(
      <DomainWorkflowsHeader domain="mock_domain" cluster="mock_cluster" />
    );

    expect(await screen.findByText('Search')).toBeInTheDocument();
    expect(await screen.findByText('Query')).toBeInTheDocument();
  });

  it('renders page search and filters button when input type is search', async () => {
    render(
      <DomainWorkflowsHeader domain="mock_domain" cluster="mock_cluster" />
    );

    expect(await screen.findByText('Filter search')).toBeInTheDocument();
    expect(await screen.findByText('Filter toggle')).toBeInTheDocument();
  });

  it('renders page filters when filter toggle is clicked', async () => {
    const user = userEvent.setup();
    render(
      <DomainWorkflowsHeader domain="mock_domain" cluster="mock_cluster" />
    );

    const filterToggle = await screen.findByText('Filter toggle');
    await user.click(filterToggle);

    expect(await screen.findByText('Filter fields')).toBeInTheDocument();
  });

  it('renders query input when input type is query', async () => {
    jest.spyOn(usePageFiltersModule, 'default').mockReturnValueOnce({
      resetAllFilters: mockResetAllFilters,
      activeFiltersCount: mockActiveFiltersCount,
      queryParams: {
        ...mockDomainPageQueryParamsValues,
        inputType: 'query',
      },
      setQueryParams: mockSetQueryParams,
    });

    render(
      <DomainWorkflowsHeader domain="mock_domain" cluster="mock_cluster" />
    );

    expect(await screen.findByText('Query')).toBeInTheDocument();
  });

  it('toggles input type when segmented control is used', async () => {
    const user = userEvent.setup();
    render(
      <DomainWorkflowsHeader domain="mock_domain" cluster="mock_cluster" />
    );

    const queryButton = await screen.findByText('Search');
    await user.click(queryButton);

    expect(mockSetQueryParams).toHaveBeenCalledWith(
      { inputType: 'search' },
      { pageRerender: true, replace: false }
    );
  });
});
