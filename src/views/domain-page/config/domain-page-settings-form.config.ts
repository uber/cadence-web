import { createElement } from 'react';

import { STYLE_TYPE, Checkbox } from 'baseui/checkbox';
import { Textarea, SIZE } from 'baseui/textarea';
import { z } from 'zod';

import { type FormField } from '@/components/form/form.types';
import formatDurationToDays from '@/utils/data-formatters/format-duration-to-days';

import DomainPageSettingsRetentionPeriod from '../domain-page-settings-retention-period/domain-page-settings-retention-period';
import { type DomainInfo } from '../domain-page.types';

export const settingsValuesConfig = z.object({
  description: z.string(),
  retentionPeriodDays: z.number(),
  visibilityArchival: z.boolean(),
  historyArchival: z.boolean(),
});

export const settingsFieldsConfig: [
  FormField<DomainInfo, typeof settingsValuesConfig, 'description'>,
  FormField<DomainInfo, typeof settingsValuesConfig, 'retentionPeriodDays'>,
  FormField<DomainInfo, typeof settingsValuesConfig, 'visibilityArchival'>,
  FormField<DomainInfo, typeof settingsValuesConfig, 'historyArchival'>,
] = [
  {
    path: 'description',
    title: 'Description',
    description: 'Brief, high-level description of the Cadence domain',
    getDefaultValue: (data) => data.description,
    component: ({ onBlur, onChange, value, error }) =>
      createElement(Textarea, {
        onBlur,
        onChange,
        value,
        error: Boolean(error),
        size: SIZE.compact,
      }),
  },
  {
    path: 'retentionPeriodDays',
    title: 'Retention Period',
    description: 'Brief, high-level description of the Cadence domain',
    getDefaultValue: (data) =>
      formatDurationToDays(data.workflowExecutionRetentionPeriod) ?? 0,
    component: DomainPageSettingsRetentionPeriod,
  },
  {
    path: 'visibilityArchival',
    title: 'Visibility Archival',
    description: 'Brief, high-level description of the Cadence domain',
    getDefaultValue: (data) =>
      data.visibilityArchivalStatus === 'ARCHIVAL_STATUS_ENABLED',
    component: ({ onBlur, onChange, value, error }) =>
      createElement(Checkbox, {
        onBlur,
        onChange,
        checked: value,
        error: Boolean(error),
        checkmarkType: STYLE_TYPE.toggle_round,
      }),
  },
  {
    path: 'historyArchival',
    title: 'History Archival',
    description: 'Brief, high-level description of the Cadence domain',
    getDefaultValue: (data) =>
      data.historyArchivalStatus === 'ARCHIVAL_STATUS_ENABLED',
    component: ({ onBlur, onChange, value, error }) =>
      createElement(Checkbox, {
        onBlur,
        onChange,
        checked: value,
        error: Boolean(error),
        checkmarkType: STYLE_TYPE.toggle_round,
      }),
  },
] as const;
