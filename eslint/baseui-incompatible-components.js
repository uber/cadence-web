/**
 * Base UI incompatible components (React 19): DatePicker → MaskedInput →
 * react-input-mask → findDOMNode. Prefer DateTimePicker or StatefulCalendar /
 * Calendar / TimePicker / TimezonePicker; DatepickerOverrides stays allowed.
 *
 * Consumed by `.eslintrc.js` as `no-restricted-imports` options.
 */
module.exports = {
  paths: [
    {
      name: 'react-input-mask',
      message:
        'Base UI incompatible: react-input-mask uses findDOMNode (removed in React 19). Do not import it.',
    },
    {
      name: 'baseui/datepicker',
      importNames: [
        'DatePicker',
        'Datepicker',
        'StatefulDatePicker',
        'Datepicker_DO_NOT_USE',
      ],
      message:
        'Base UI incompatible component. Use @/components/date-time-picker or StatefulCalendar / Calendar / TimePicker / TimezonePicker. DatepickerOverrides remains allowed for Calendar styling.',
    },
    {
      name: 'baseui/input',
      importNames: ['MaskedInput'],
      message:
        'Base UI incompatible component: MaskedInput pulls react-input-mask (findDOMNode). Use baseui Input instead.',
    },
  ],
  patterns: [
    {
      group: ['baseui/datepicker/*', 'baseui/datepicker/**'],
      message:
        'Do not deep-import baseui/datepicker. Use DateTimePicker or allowed calendar/time exports from baseui/datepicker.',
    },
    {
      group: [
        'baseui/input/masked-input',
        'baseui/input/masked-input/*',
        '**/react-input-mask',
        '**/react-input-mask/*',
      ],
      message:
        'Base UI incompatible: masked input / react-input-mask is banned (findDOMNode / React 19).',
    },
  ],
};
