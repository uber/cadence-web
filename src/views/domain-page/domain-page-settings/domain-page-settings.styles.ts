import { styled as createStyled, type Theme } from 'baseui';
import { type ToasterOverrides } from 'baseui/toast';

export const styled = {
  SettingsContainer: createStyled('div', ({ $theme }: { $theme: Theme }) => ({
    paddingTop: $theme.sizing.scale950,
  })),
};

export const overrides = {
  toast: {
    ToastBody: {
      style: {
        width: '500px',
      },
    },
  } satisfies ToasterOverrides,
};
