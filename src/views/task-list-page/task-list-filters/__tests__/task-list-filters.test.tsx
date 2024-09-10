import React from 'react';

import { userEvent } from '@testing-library/user-event';

import { render, screen } from '@/test-utils/rtl';

import { mockQueryParamsValues } from '@/components/page-filters/__fixtures__/page-filters.fixtures';

import TaskListFilters from '../task-list-filters';

const mockSetQueryParams = jest.fn();
jest.mock('@/hooks/use-page-query-params/use-page-query-params', () =>
  jest.fn(() => [mockQueryParamsValues, mockSetQueryParams])
);

describe(TaskListFilters.name, () => {
  it('renders without errors', async () => {
    const user = userEvent.setup();
    render(<TaskListFilters />);

    // Assert search bar
    expect(
      await screen.findByPlaceholderText('Find worker by identity')
    ).toBeInTheDocument();

    await user.click(screen.getByText('Filters'));
    // Assert filters
    expect(await screen.findByText('Handlers')).toBeInTheDocument();
    expect(await screen.findByText('Show all handlers')).toBeInTheDocument();
  });
});
