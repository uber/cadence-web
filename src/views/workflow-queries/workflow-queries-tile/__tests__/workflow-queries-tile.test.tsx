import React from 'react';

import { userEvent } from '@testing-library/user-event';

import { render, screen } from '@/test-utils/rtl';

import WorkflowQueriesTile from '../workflow-queries-tile';

jest.mock('../../workflow-queries-tile-input/workflow-queries-tile-input', () =>
  jest.fn(() => <div>Mock input</div>)
);

describe(WorkflowQueriesTile.name, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when unselected', () => {
    const { container } = setup({});

    expect(container).toMatchSnapshot();
  });

  it('renders correctly when selected', () => {
    const { container } = setup({ isSelected: true });

    expect(container).toMatchSnapshot();
  });

  it('renders correctly when an input is present', () => {
    const { container } = setup({ input: 'test input' });

    expect(screen.getByText('Mock input')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('calls onSelect when clicked', async () => {
    const { user, mockOnSelect } = setup({});

    await user.click(screen.getByText('mock-query'));

    expect(mockOnSelect).toHaveBeenCalled();
  });

  it('adds input when input is absent and the button is clicked', async () => {
    const { user, mockSetInput } = setup({});

    expect(screen.queryByText('Mock input')).toBeNull();

    await user.click(screen.getByText('Add input'));

    expect(mockSetInput).toHaveBeenCalledWith('');
  });

  it('removes input when input is present and the button is clicked', async () => {
    const { user, mockSetInput } = setup({ input: 'test input' });

    expect(screen.getByText('Mock input')).toBeInTheDocument();

    await user.click(screen.getByText('Remove input'));

    expect(mockSetInput).toHaveBeenCalledWith(undefined);
  });

  it('calls runQuery when the Run button is clicked', async () => {
    const { user, mockRunQuery } = setup({});

    await user.click(screen.getByText('Run'));

    expect(mockRunQuery).toHaveBeenCalled();
  });
});

function setup({
  input = undefined,
  isSelected = false,
}: {
  input?: string | undefined;
  isSelected?: boolean;
}) {
  const user = userEvent.setup();
  const mockSetInput = jest.fn();
  const mockOnSelect = jest.fn();
  const mockRunQuery = jest.fn();

  const { container } = render(
    <WorkflowQueriesTile
      name="mock-query"
      input={input}
      setInput={mockSetInput}
      isSelected={isSelected}
      onSelect={mockOnSelect}
      runQuery={mockRunQuery}
      queryStatus="pending"
    />
  );

  return {
    user,
    container,
    mockSetInput,
    mockOnSelect,
    mockRunQuery,
  };
}
