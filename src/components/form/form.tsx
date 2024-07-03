'use client';
import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl } from 'baseui/form-control';
import { type SubmitHandler, useForm, Controller } from 'react-hook-form';
import { type z } from 'zod';

import { styled } from './form.styles';
import { type FormValues, type FormConfig } from './form.types';
import getDefaultValues from './helpers/get-default-values';

export default function Form<D extends object, Z extends z.ZodTypeAny>({
  data,
  zodSchema,
  formConfig,
  onSubmit,
}: {
  data: D;
  zodSchema: Z;
  formConfig: FormConfig<D, Z>;
  onSubmit: SubmitHandler<FormValues<Z>>;
}) {
  const { control, handleSubmit, formState } = useForm<FormValues<Z>>({
    mode: 'onBlur',
    defaultValues: getDefaultValues({ data, formConfig }),
    resolver: zodResolver(zodSchema),
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(onSubmit)(event);
      }}
    >
      {formConfig.map((field) => {
        return (
          <styled.FieldContainer key={field.path}>
            <styled.Info>
              <styled.Title>{field.title}</styled.Title>
              <styled.Description>{field.description}</styled.Description>
            </styled.Info>
            <FormControl
              error={formState.errors[field.path]?.message?.toString()}
            >
              <Controller
                control={control}
                name={field.path}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <field.component
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={error?.message}
                  />
                )}
              />
            </FormControl>
          </styled.FieldContainer>
        );
      })}
      <input type="submit" />
    </form>
  );
}
