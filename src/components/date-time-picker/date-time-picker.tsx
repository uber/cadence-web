'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type Ref,
} from 'react';

import { Calendar, TimePicker } from 'baseui/datepicker';
import { Input } from 'baseui/input';
import { StatefulPopover } from 'baseui/popover';

import dayjs from '@/utils/datetime/dayjs';

import { DATE_TIME_FORMAT_MINUTES } from './date-time-picker.constants';
import { styled } from './date-time-picker.styles';
import { type Props } from './date-time-picker.types';
import formatDateTimeValue from './helpers/format-date-time-value';
import parseDateTimeValue from './helpers/parse-date-time-value';

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (!ref) return;
  if (typeof ref === 'function') {
    ref(value);
    return;
  }
  // RefObject.current is typed readonly; callback/object refs both work at runtime.
  (ref as { current: T | null }).current = value;
}

const stopEscapePropagation = (e: globalThis.KeyboardEvent) => {
  if (e.key === 'Escape') e.stopPropagation();
};

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
  const inputElRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setDraft(formatDateTimeValue(value, displayFormat));
  }, [value, displayFormat]);

  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      if (inputElRef.current) {
        inputElRef.current.removeEventListener(
          'keydown',
          stopEscapePropagation
        );
      }
      inputElRef.current = node;
      // Native listener (same path as baseui clearOnEscape) so Escape does not
      // bubble to a parent modal after we disable clear-on-escape.
      if (node) node.addEventListener('keydown', stopEscapePropagation);
      assignRef(inputRef, node);
    },
    [inputRef]
  );

  const isBeforeMin = (next: Date) =>
    Boolean(minDate && dayjs(next).isBefore(dayjs(minDate)));

  const commitDate = (next: Date | null | undefined) => {
    if (!next || Number.isNaN(next.getTime())) {
      if (clearable) {
        onChange(undefined);
        setDraft('');
      }
      return;
    }
    if (isBeforeMin(next)) return;
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
          <Calendar
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
          // @ts-expect-error baseui types RefObject; callback refs work at runtime
          inputRef={setInputRef}
          aria-label={ariaLabel}
          size={size}
          disabled={disabled}
          error={error}
          clearable={clearable}
          // Clearing is the X / empty blur only — not Escape.
          clearOnEscape={false}
          value={draft}
          onChange={(e) => {
            const next = e.currentTarget.value;
            setDraft(next);
            // Empty input (including baseui clearValue) must commit immediately so
            // parent value cannot repopulate the draft when the popover opens.
            if (clearable && !next.trim()) onChange(undefined);
          }}
          overrides={{
            ClearIcon: {
              props: {
                // Replace baseui clear click: stop popover toggle and commit empty.
                onMouseDown: (e: MouseEvent) => e.stopPropagation(),
                onClick: (e: MouseEvent) => {
                  e.stopPropagation();
                  if (!clearable) return;
                  setDraft('');
                  onChange(undefined);
                },
              },
            },
          }}
          onBlur={() => {
            const formatted = formatDateTimeValue(value, displayFormat);
            if (!draft.trim()) {
              if (clearable) onChange(undefined);
              else setDraft(formatted);
              return;
            }
            // Skip re-parse when unchanged (minutes format would drop seconds/ms).
            if (draft === formatted) return;
            const iso = parseDateTimeValue(draft, displayFormat);
            if (iso && !isBeforeMin(dayjs(iso).toDate())) {
              onChange(iso);
              setDraft(formatDateTimeValue(iso, displayFormat));
              return;
            }
            setDraft(formatted);
          }}
        />
      </div>
    </StatefulPopover>
  );
}
