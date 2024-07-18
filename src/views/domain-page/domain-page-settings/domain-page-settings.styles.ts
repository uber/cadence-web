import { styled as createStyled, type Theme } from 'baseui';
import { type ToasterOverrides } from 'baseui/toast';
import { type StyleObject } from 'styletron-react';

export const styled = {
  SettingsContainer: createStyled('div', ({ $theme }: { $theme: Theme }) => ({
    paddingTop: $theme.sizing.scale950,
  })),
};

export const overrides = {
  toast: {
    ToastBody: {
      style: ({ $theme }: { $theme: Theme }): StyleObject => ({
        [$theme.mediaQuery.medium]: {
          width: '500px',
        },
      }),
    },
    ToastCloseIcon: {
      style: {
        alignSelf: 'center',
      },
    },
  } satisfies ToasterOverrides,
};
