import type { Meta, StoryObj } from '@storybook/nextjs';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import DateTimePicker from './date-time-picker';
import {
  DATE_TIME_FORMAT_MINUTES,
  DATE_TIME_FORMAT_SECONDS,
} from './date-time-picker.constants';
import { type Props } from './date-time-picker.types';

const meta = {
  title: 'Components/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    'aria-label': 'When',
    value: undefined,
    onChange: fn(),
    displayFormat: DATE_TIME_FORMAT_MINUTES,
    clearable: true,
    disabled: false,
    error: false,
    size: 'compact',
  },
  argTypes: {
    displayFormat: {
      control: 'select',
      options: [DATE_TIME_FORMAT_MINUTES, DATE_TIME_FORMAT_SECONDS],
    },
    size: {
      control: 'select',
      options: ['mini', 'compact', 'default', 'large'],
    },
    minDate: { control: 'date' },
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 280, minHeight: 420 }}>
        <Story />
      </div>
    ),
  ],
  render: function Render(args: Props) {
    const [{ value }, updateArgs] = useArgs<Props>();
    // Storybook date controls emit a timestamp number, not a Date.
    const minDate =
      args.minDate == null
        ? undefined
        : args.minDate instanceof Date
          ? args.minDate
          : new Date(args.minDate as unknown as number);

    return (
      <DateTimePicker
        {...args}
        minDate={minDate}
        value={value}
        onChange={(next) => {
          args.onChange(next);
          updateArgs({ value: next });
        }}
      />
    );
  },
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithValue: Story = {
  args: {
    value: '2024-06-15T14:30:00.000Z',
  },
};

export const SecondsFormat: Story = {
  args: {
    value: '2024-06-15T14:30:45.000Z',
    displayFormat: DATE_TIME_FORMAT_SECONDS,
  },
};

export const MinDate: Story = {
  args: {
    value: '2024-06-15T14:30:00.000Z',
    minDate: new Date('2024-06-01T00:00:00.000Z'),
  },
};

export const Disabled: Story = {
  args: {
    value: '2024-06-15T14:30:00.000Z',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    value: '2024-06-15T14:30:00.000Z',
    error: true,
  },
};

export const NotClearable: Story = {
  args: {
    value: '2024-06-15T14:30:00.000Z',
    clearable: false,
  },
};
