import React from 'react';

import { render, screen, act, fireEvent } from '@/test-utils/rtl';

import {
  mockDomainWorkflowsQueryParamsValues,
  mockDateOverridesArchival,
} from '../../__fixtures__/domain-workflows-query-params';
import DomainWorkflowsArchivalFiltersDates from '../domain-workflows-archival-filters-dates';
import { type DomainWorkflowsArchivalFiltersDatesValue } from '../domain-workflows-archival-filters-dates.types';

jest.useFakeTimers().setSystemTime(new Date('2023-05-25'));

jest.mock(
  '../../domain-workflows-filters-dates/domain-workflows-filters-dates.constants',
  () => ({
    ...jest.requireActual(
      '../../domain-workflows-filters-dates/domain-workflows-filters-dates.constants'
    ),
    DATE_FORMAT: 'dd MMM yyyy, HH:mm x',
  })
);

describe('DomainWorkflowsArchivalFiltersDates', () => {
  it('displays the date picker component', () => {
    setup({});
    expect(
      screen.getByPlaceholderText('Select time range')
    ).toBeInTheDocument();
  });

  it('renders without errors when dates are already provided in query params', () => {
    setup({
      overrides: mockDateOverridesArchival,
    });
    expect(
      // TODO - set timezone config for unit tests to UTC
      screen.getByDisplayValue(
        '23 May 2023, 00:00 +00 – 24 May 2023, 00:00 +00'
      )
    ).toBeInTheDocument();
  });

  it('sets query params when date is set', () => {
    const { mockSetValue } = setup({});
    const datePicker = screen.getByPlaceholderText('Select time range');
    act(() => {
      fireEvent.change(datePicker, {
        target: { value: '13 May 2023, 00:00 +00 – 14 May 2023, 00:00 +00' },
      });
    });

    expect(mockSetValue).toHaveBeenCalledWith({
      timeRangeStartArchival: new Date('2023-05-13T00:00:00.000Z'),
      timeRangeEndArchival: new Date('2023-05-14T00:00:00.000Z'),
    });
  });

  it('resets to previous date when one date is selected and then the modal is closed', () => {
    const { mockSetValue } = setup({
      overrides: mockDateOverridesArchival,
    });
    const datePicker = screen.getByPlaceholderText('Select time range');

    act(() => {
      fireEvent.focus(datePicker);
    });

    const timeRangeStartLabel = screen.getByLabelText(
      "Choose Saturday, May 13th 2023. It's available."
    );

    act(() => {
      fireEvent.click(timeRangeStartLabel);
    });

    screen.getByText(
      'Selected date is 13 May 2023, 00:00 +00. Select the second date.'
    );

    act(() => {
      fireEvent.keyDown(datePicker, { keyCode: 9 });
    });

    expect(datePicker).toHaveValue(
      '23 May 2023, 00:00 +00 – 24 May 2023, 00:00 +00'
    );
    expect(mockSetValue).not.toHaveBeenCalled();
  });

  it('resets to empty state when one date is selected and then the modal is closed', () => {
    const { mockSetValue } = setup({});
    const datePicker = screen.getByPlaceholderText('Select time range');

    act(() => {
      fireEvent.focus(datePicker);
    });

    const timeRangeStartLabel = screen.getByLabelText(
      "Choose Saturday, May 13th 2023. It's available."
    );

    act(() => {
      fireEvent.click(timeRangeStartLabel);
    });

    screen.getByText(
      'Selected date is 13 May 2023, 00:00 +00. Select the second date.'
    );

    act(() => {
      fireEvent.keyDown(datePicker, { keyCode: 9 });
    });

    expect(datePicker).toHaveValue('');
    expect(mockSetValue).not.toHaveBeenCalled();
  });

  it('clears the date when the clear button is clicked', () => {
    const { mockSetValue } = setup({
      overrides: mockDateOverridesArchival,
    });
    const clearButton = screen.getByLabelText('Clear value');
    act(() => {
      fireEvent.click(clearButton);
    });

    expect(mockSetValue).toHaveBeenCalledWith({
      timeRangeStartArchival: undefined,
      timeRangeEndArchival: undefined,
    });
  });
});

function setup({
  overrides,
}: {
  overrides?: DomainWorkflowsArchivalFiltersDatesValue;
}) {
  const mockSetValue = jest.fn();
  render(
    <DomainWorkflowsArchivalFiltersDates
      value={{
        timeRangeStartArchival:
          mockDomainWorkflowsQueryParamsValues.timeRangeStart,
        timeRangeEndArchival: mockDomainWorkflowsQueryParamsValues.timeRangeEnd,
        ...overrides,
      }}
      setValue={mockSetValue}
    />
  );

  return { mockSetValue };
}
