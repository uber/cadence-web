import { ESLint } from 'eslint';

import baseuiIncompatibleComponents from '../baseui-incompatible-components';

describe('baseui incompatible components', () => {
  it.each([
    {
      name: 'DatePicker from baseui/datepicker',
      code: `import { DatePicker } from 'baseui/datepicker';\n`,
      error:
        "'DatePicker' import from 'baseui/datepicker' is restricted. Base UI incompatible component. Use @/components/date-time-picker or StatefulCalendar / Calendar / TimePicker / TimezonePicker. DatepickerOverrides remains allowed for Calendar styling.",
    },
    {
      name: 'StatefulDatePicker from baseui/datepicker',
      code: `import { StatefulDatePicker } from 'baseui/datepicker';\n`,
      error:
        "'StatefulDatePicker' import from 'baseui/datepicker' is restricted. Base UI incompatible component. Use @/components/date-time-picker or StatefulCalendar / Calendar / TimePicker / TimezonePicker. DatepickerOverrides remains allowed for Calendar styling.",
    },
    {
      name: 'MaskedInput from baseui/input',
      code: `import { MaskedInput } from 'baseui/input';\n`,
      error:
        "'MaskedInput' import from 'baseui/input' is restricted. Base UI incompatible component: MaskedInput pulls react-input-mask (findDOMNode). Use baseui Input instead.",
    },
    {
      name: 'react-input-mask default import',
      code: `import InputMask from 'react-input-mask';\n`,
      error:
        "'react-input-mask' import is restricted from being used. Base UI incompatible: react-input-mask uses findDOMNode (removed in React 19). Do not import it.",
    },
  ])('bans $name', async ({ code, error }) => {
    const messages = await lintRestrictedImports(code);

    expect(messages.map((message) => message.message)).toContain(error);
  });

  it.each([
    {
      name: 'Calendar from baseui/datepicker',
      code: `import { Calendar } from 'baseui/datepicker';\n`,
    },
    {
      name: 'DatepickerOverrides type from baseui/datepicker',
      code: `import { type DatepickerOverrides } from 'baseui/datepicker';\n`,
    },
    {
      name: 'Input from baseui/input',
      code: `import { Input } from 'baseui/input';\n`,
    },
  ])('allows $name', async ({ code }) => {
    const messages = await lintRestrictedImports(code);

    expect(messages).toEqual([]);
  });
});

async function lintRestrictedImports(code: string) {
  const eslint = new ESLint({
    useEslintrc: false,
    overrideConfig: {
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      rules: {
        'no-restricted-imports': ['error', baseuiIncompatibleComponents],
      },
    },
  });
  const [result] = await eslint.lintText(code, {
    filePath: 'src/baseui-incompatible-imports-fixture.tsx',
  });

  return result.messages.filter(
    (message) => message.ruleId === 'no-restricted-imports'
  );
}
