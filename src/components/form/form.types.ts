import type React from 'react';

import { type Path } from 'react-hook-form';
import { type z } from 'zod';

export type FieldComponentProps<V> = {
  onBlur: (e: any) => void;
  onChange: (e: any) => void;
  value: V;
  error?: string;
};

export type FormValues<Z extends z.ZodTypeAny> = z.infer<Z>;

export type FormField<
  D extends object,
  Z extends z.ZodTypeAny,
  K extends keyof FormValues<Z>,
> = {
  path: K extends Path<FormValues<Z>> ? K : never;
  title: string;
  description: string;
  getDefaultValue: (data: D) => FormValues<Z>[K];
  component: React.ComponentType<FieldComponentProps<FormValues<Z>[K]>>;
};

export type FormConfig<D extends object, Z extends z.ZodTypeAny> = Array<
  FormField<D, Z, any>
>;
