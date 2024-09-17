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
      <WorkflowQueriesTileInput value="" setValue={jest.fn()} />,
      { isSnapshotTest: true }
    );

    expect(container).toMatchSnapshot();
  });

  it('renders correctly with a non-empty value', () => {
    const { container } = render(
      <WorkflowQueriesTileInput value="test value" setValue={jest.fn()} />,
      { isSnapshotTest: true }
    );

    expect(container).toMatchSnapshot();
  });

  it('calls setValue when typed into', async () => {
    const user = userEvent.setup();
    const mockSetValue = jest.fn();

    render(<WorkflowQueriesTileInput value="" setValue={mockSetValue} />);

    await user.type(screen.getByRole('textbox'), 'a');

    expect(mockSetValue).toHaveBeenCalledWith('a');
  });
});
