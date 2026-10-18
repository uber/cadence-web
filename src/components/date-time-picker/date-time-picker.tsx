'use client';

import { useEffect, useState } from 'react';

import { StatefulCalendar, TimePicker } from 'baseui/datepicker';
import { Input } from 'baseui/input';
import { StatefulPopover } from 'baseui/popover';

import dayjs from '@/utils/datetime/dayjs';

import { DATE_TIME_FORMAT_MINUTES } from './date-time-picker.constants';
import { styled } from './date-time-picker.styles';
import { type Props } from './date-time-picker.types';
import formatDateTimeValue from './helpers/format-date-time-value';
import parseDateTimeValue from './helpers/parse-date-time-value';

export default function DateTimePicker({
  value,
  onChange,
  displayFormat = DATE_TIME_FORMAT_MINUTES,
  minDate,
  clearable = true,
  disabled,
  error,
  id,
  'aria-label': ariaLabel,
  size = 'compact',
  inputRef,
}: Props) {
  const [draft, setDraft] = useState(() =>
    formatDateTimeValue(value, displayFormat)
  );

  useEffect(() => {
    setDraft(formatDateTimeValue(value, displayFormat));
  }, [value, displayFormat]);

  const commitDate = (next: Date | null | undefined) => {
    if (!next || Number.isNaN(next.getTime())) {
      if (clearable) {
        onChange(undefined);
        setDraft('');
      }
      return;
    }
    const iso = dayjs(next).toISOString();
    onChange(iso);
    setDraft(formatDateTimeValue(iso, displayFormat));
  };

  const selectedDate = value ? dayjs(value).toDate() : null;
  const baseDay = selectedDate ? dayjs(selectedDate) : dayjs().startOf('day');

  return (
    <StatefulPopover
      triggerType="click"
      dismissOnClickOutside
      ignoreBoundary
      content={() => (
        <styled.PopoverBody>
          <StatefulCalendar
            density="high"
            value={selectedDate}
            minDate={minDate}
            onChange={({ date }) => {
              const d = Array.isArray(date) ? date[0] : date;
              if (!d) return commitDate(null);
              commitDate(
                dayjs(d)
                  .hour(baseDay.hour())
                  .minute(baseDay.minute())
                  .second(baseDay.second())
                  .millisecond(0)
                  .toDate()
              );
            }}
          />
          <TimePicker
            size="compact"
            creatable
            nullable={clearable}
            disabled={disabled}
            value={selectedDate}
            onChange={(time) => {
              if (!time) return commitDate(null);
              commitDate(
                baseDay
                  .hour(time.getHours())
                  .minute(time.getMinutes())
                  .second(time.getSeconds())
                  .millisecond(0)
                  .toDate()
              );
            }}
          />
        </styled.PopoverBody>
      )}
    >
      <div>
        <Input
          id={id}
          // baseui Input types inputRef as RefObject; RHF often passes a callback ref.
          // @ts-expect-error callback refs are runtime-supported
          inputRef={inputRef}
          aria-label={ariaLabel}
          size={size}
          disabled={disabled}
          error={error}
          clearable={clearable}
          value={draft}
          onChange={(e) => setDraft(e.currentTarget.value)}
          onBlur={() => {
            if (!draft.trim()) {
              if (clearable) onChange(undefined);
              else setDraft(formatDateTimeValue(value, displayFormat));
              return;
            }
            const iso = parseDateTimeValue(draft, displayFormat);
            setDraft(
              iso
                ? formatDateTimeValue(iso, displayFormat)
                : formatDateTimeValue(value, displayFormat)
            );
            if (iso) onChange(iso);
          }}
        />
      </div>
    </StatefulPopover>
  );
}
