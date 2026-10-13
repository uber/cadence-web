import { useCallback, useMemo } from 'react';

import { useStyletron } from 'baseui';
import { FormControl } from 'baseui/form-control';

import isAntiSelectEvent from './helpers/is-anti-select-event';
import SelectableTag from './selectable-tag/selectable-tag';
import { overrides, styled } from './tag-filter.styles';
import { type Props } from './tag-filter.types';

export default function TagFilter<T extends string>({
  label,
  values,
  onChangeValues,
  optionsConfig,
  hideShowAll,
}: Props<T>) {
  const [_, theme] = useStyletron();

  const tagKeys = useMemo(
    () => Object.keys(optionsConfig) as Array<T>,
    [optionsConfig]
  );

  const isShowAll = useMemo(() => values.length === 0, [values]);

  const onChangeSingleValue = useCallback(
    (value: T) =>
      onChangeValues(
        values.includes(value)
          ? values.filter((v) => v !== value)
          : [...values, value]
      ),
    [values, onChangeValues]
  );

  const onClickTag = useCallback(
    (value: T, event: Event) => {
      if (!isAntiSelectEvent(event)) {
        onChangeSingleValue(value);
        return;
      }

      const others = tagKeys.filter((k) => k !== value);
      const isAllButValue =
        values.length === others.length &&
        others.every((k) => values.includes(k));
      onChangeValues(isAllButValue ? [] : others);
    },
    [tagKeys, values, onChangeValues, onChangeSingleValue]
  );

  return (
    <styled.FormControlContainer>
      <FormControl label={label} overrides={overrides.formControl}>
        <styled.TagsContainer>
          {!hideShowAll && (
            <SelectableTag value={isShowAll} onClick={() => onChangeValues([])}>
              Show all
            </SelectableTag>
          )}
          {tagKeys.map((tagKey) => {
            const { label, startEnhancer: StartEnhancer } =
              optionsConfig[tagKey];
            return (
              <SelectableTag
                key={tagKey}
                value={values.includes(tagKey)}
                onClick={(e) => onClickTag(tagKey, e)}
                {...(StartEnhancer
                  ? { startEnhancer: () => <StartEnhancer theme={theme} /> }
                  : {})}
              >
                {label}
              </SelectableTag>
            );
          })}
        </styled.TagsContainer>
      </FormControl>
    </styled.FormControlContainer>
  );
}
