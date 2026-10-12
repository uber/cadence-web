import type { Meta, StoryObj } from '@storybook/nextjs';
import { MdCircle } from 'react-icons/md';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import TagFilter from './tag-filter';
import { type Props, type TagFilterOptionConfig } from './tag-filter.types';

const optionsConfig = {
  RED: {
    label: 'Red',
    startEnhancer: ({ theme }) => <MdCircle color={theme.colors.red400} />,
  },
  GREEN: {
    label: 'Green',
    startEnhancer: ({ theme }) => <MdCircle color={theme.colors.green400} />,
  },
  BLUE: {
    label: 'Blue',
    startEnhancer: ({ theme }) => <MdCircle color={theme.colors.blue400} />,
  },
  YELLOW: {
    label: 'Yellow',
    startEnhancer: ({ theme }) => <MdCircle color={theme.colors.yellow400} />,
  },
} as const satisfies Record<string, TagFilterOptionConfig>;

type Option = keyof typeof optionsConfig;

const meta = {
  title: 'Components/TagFilter',
  component: TagFilter<Option>,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Click a tag to toggle it. Cmd/Ctrl + click (or Cmd/Ctrl + Enter) selects all other tags; repeat to go back to "Show all".',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    label: 'Color',
    values: [],
    optionsConfig,
    onChangeValues: fn(),
  },
  render: function Render(args: Props<Option>) {
    const [{ values }, updateArgs] = useArgs<Props<Option>>();

    return (
      <TagFilter<Option>
        {...args}
        values={values}
        onChangeValues={(next) => {
          args.onChangeValues(next);
          updateArgs({ values: next });
        }}
      />
    );
  },
} satisfies Meta<Props<Option>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShowAll: Story = {};

export const SomeSelected: Story = {
  args: {
    values: ['RED', 'BLUE'],
  },
};

export const AllButOneSelected: Story = {
  args: {
    values: ['RED', 'GREEN', 'BLUE'],
  },
};

export const HideShowAll: Story = {
  args: {
    hideShowAll: true,
    values: ['GREEN'],
  },
};
