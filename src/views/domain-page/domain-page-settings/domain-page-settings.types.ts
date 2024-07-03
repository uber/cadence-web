import { type z } from 'zod';

import { type settingsValuesConfig } from '../config/domain-page-settings-form.config';

export type SettingsValues = z.infer<typeof settingsValuesConfig>;
