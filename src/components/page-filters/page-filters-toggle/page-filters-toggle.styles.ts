import { type Theme } from 'baseui';
import type { ButtonOverrides } from 'baseui/button';
import { type StyleObject } from 'styletron-react';

export const overrides = {
  filtersButton: {
    Root: {
      style: ({ $theme }: { $theme: Theme }): StyleObject => ({
        whiteSpace: 'nowrap',
        height: $theme.sizing.scale950,
        ...$theme.typography.LabelSmall,
      }),
    },
  } satisfies ButtonOverrides,
};
