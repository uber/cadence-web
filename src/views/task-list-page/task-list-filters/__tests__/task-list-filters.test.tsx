import React from 'react';

import { render, screen } from '@/test-utils/rtl';

import TaskListFilters from '../task-list-filters';

jest.mock('@/components/page-filters/page-filters', () =>
  jest.fn(() => <div>Mock page filters</div>)
);

describe(TaskListFilters.name, () => {
  it('renders without errors', () => {
    render(<TaskListFilters />);

    expect(screen.getByText('Mock page filters')).toBeInTheDocument();
  });
});
