import { type ComponentProps } from 'react';

import { render, screen, userEvent } from '@/test-utils/rtl';

import DateTimePicker from '../date-time-picker';
import { DATE_TIME_FORMAT_MINUTES } from '../date-time-picker.constants';

jest.mock('baseui/datepicker', () => ({
  Calendar: () => <div data-testid="calendar" />,
  TimePicker: () => <div data-testid="time-picker" />,
}));

describe(DateTimePicker.name, () => {
  it('commits typed display-format input on blur', async () => {
    const { user, onChange } = setup();
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, '2024/06/15 14:30');
    await user.tab();
    expect(onChange.mock.calls.at(-1)?.[0]).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('rejects partial input and clears when emptied', async () => {
    const { user, onChange } = setup({ value: '2024-01-01T00:00:00.000Z' });
    onChange.mockClear();
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, '2024/06');
    await user.tab();
    expect(onChange).not.toHaveBeenCalled();
    await user.clear(input);
    await user.tab();
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it('does not re-commit on blur when draft matches formatted value', async () => {
    const value = '2024-06-15T14:30:45.123Z';
    const { user, onChange } = setup({ value });
    onChange.mockClear();
    await user.click(screen.getByRole('textbox'));
    await user.tab();
    expect(onChange).not.toHaveBeenCalled();
  });
});

function setup(props: Partial<ComponentProps<typeof DateTimePicker>> = {}) {
  const onChange = jest.fn();
  const user = userEvent.setup();
  render(
    <DateTimePicker
      aria-label="When"
      displayFormat={DATE_TIME_FORMAT_MINUTES}
      onChange={onChange}
      {...props}
    />
  );
  return { user, onChange };
}
