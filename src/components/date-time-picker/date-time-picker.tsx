'use client';

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';

import { Calendar } from 'baseui/datepicker';
import { Input } from 'baseui/input';
import { Popover } from 'baseui/popover';

import dayjs from '@/utils/datetime/dayjs';

import { DATE_TIME_FORMAT_MINUTES } from './date-time-picker.constants';
import { styled } from './date-time-picker.styles';
import { type Props } from './date-time-picker.types';
import assignRef from './helpers/assign-ref';
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
  const [isOpen, setIsOpen] = useState(false);
  const [calendarFocused, setCalendarFocused] = useState(false);
  const inputElRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setDraft(formatDateTimeValue(value, displayFormat));
  }, [value, displayFormat]);

  useEffect(() => {
    assignRef(inputRef, inputElRef.current);
    return () => assignRef(inputRef, null);
  }, [inputRef]);

  const closePopover = () => {
    const shouldRefocus = calendarFocused;
    setIsOpen(false);
    setCalendarFocused(false);
    if (shouldRefocus) inputElRef.current?.focus();
  };

  const commitClear = () => {
    if (!clearable) return;
    setDraft('');
    onChange(undefined);
  };

  const commitDate = (next: Date | null | undefined) => {
    if (!next || Number.isNaN(next.getTime())) {
      commitClear();
      return;
    }
    const clamped =
      minDate && dayjs(next).isBefore(dayjs(minDate)) ? minDate : next;
    const iso = dayjs(clamped).toISOString();
    onChange(iso);
    setDraft(formatDateTimeValue(iso, displayFormat));
  };

  const selectedDate = value ? dayjs(value).toDate() : null;

  return (
    <Popover
      triggerType="click"
      ignoreBoundary
      autoFocus={false}
      returnFocus={false}
      isOpen={isOpen}
      onClick={() => {
        setIsOpen((open) => !open);
        setCalendarFocused(false);
      }}
      onClickOutside={closePopover}
      onEsc={closePopover}
      content={
        <styled.PopoverBody>
          <Calendar
            density="high"
            value={selectedDate}
            minDate={minDate}
            autoFocusCalendar={calendarFocused}
            timeSelectStart
            trapTabbing
            overrides={{
              TimeSelect: {
                props: {
                  size: 'compact',
                  creatable: true,
                  nullable: clearable,
                  disabled,
                },
              },
            }}
            onChange={({ date }) => {
              const d = Array.isArray(date) ? date[0] : date;
              commitDate(d ?? null);
            }}
          />
        </styled.PopoverBody>
      }
    >
      <div>
        <Input
          id={id}
          inputRef={inputElRef}
          aria-label={ariaLabel}
          size={size}
          disabled={disabled}
          error={error}
          clearable={clearable}
          clearOnEscape={false}
          value={draft}
          onChange={(e) => {
            setDraft(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' || (isOpen && e.key === 'Enter')) {
              e.preventDefault();
              setIsOpen(true);
              setCalendarFocused(true);
              return;
            }
            if (isOpen && e.key === 'Tab') {
              closePopover();
            }
          }}
          overrides={{
            ClearIcon: {
              props: {
                onMouseDown: (e: MouseEvent) => e.stopPropagation(),
                onClick: (e: MouseEvent) => {
                  e.stopPropagation();
                  commitClear();
                },
                onKeyDown: (e: KeyboardEvent) => {
                  if (e.key !== 'Enter' && e.key !== ' ') return;
                  e.preventDefault();
                  e.stopPropagation();
                  commitClear();
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
            // Re-parsing an unchanged minutes draft would zero seconds/ms.
            if (draft === formatted) return;
            const iso = parseDateTimeValue(draft, displayFormat);
            if (!iso) {
              setDraft(formatted);
              return;
            }
            commitDate(dayjs(iso).toDate());
          }}
        />
      </div>
    </Popover>
  );
}
