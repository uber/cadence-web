import { Theme } from 'baseui';
import type { FormControlOverrides } from 'baseui/form-control/types';
import { StyleObject } from 'styletron-react';

export const overrides = {
  dateFormControl: {
    Label: {
      style: ({ $theme }: { $theme: Theme }): StyleObject => ({
        ...$theme.typography.LabelXSmall,
      }),
    },
    ControlContainer: {
      style: (): StyleObject => ({
        margin: '0px',
      }),
    },
  } satisfies FormControlOverrides,
};
