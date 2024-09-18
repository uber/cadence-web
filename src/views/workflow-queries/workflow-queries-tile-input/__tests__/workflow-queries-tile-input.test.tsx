import React from 'react';

import { userEvent } from '@testing-library/user-event';

import { render, screen } from '@/test-utils/rtl';

import WorkflowQueriesTileInput from '../workflow-queries-tile-input';

describe(WorkflowQueriesTileInput.name, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { container } = render(
      <WorkflowQueriesTileInput value="" onChange={jest.fn()} />,
      { isSnapshotTest: true }
    );

    expect(container).toMatchSnapshot();
  });

  it('renders correctly with a non-empty value', () => {
    const { container } = render(
      <WorkflowQueriesTileInput value="test value" onChange={jest.fn()} />,
      { isSnapshotTest: true }
    );

    expect(container).toMatchSnapshot();
  });

  it('calls onChange when typed into', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    render(<WorkflowQueriesTileInput value="" onChange={mockOnChange} />);

    await user.type(screen.getByRole('textbox'), 'a');

    expect(mockOnChange).toHaveBeenCalledWith('a');
  });
});
