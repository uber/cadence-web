import { type Ref } from 'react';

import {
  DATE_TIME_FORMAT_MINUTES,
  DATE_TIME_FORMAT_SECONDS,
} from './date-time-picker.constants';

export type DateTimeDisplayFormat =
  | typeof DATE_TIME_FORMAT_MINUTES
  | typeof DATE_TIME_FORMAT_SECONDS;

export type Props = {
  value?: string;
  onChange: (next: string | undefined) => void;
  displayFormat?: DateTimeDisplayFormat;
  minDate?: Date;
  clearable?: boolean;
  disabled?: boolean;
  error?: boolean;
  id?: string;
  'aria-label'?: string;
  size?: 'compact' | 'default' | 'large' | 'mini';
  inputRef?: Ref<HTMLInputElement>;
};
