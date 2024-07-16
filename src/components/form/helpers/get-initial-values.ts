import { type z } from 'zod';

import { type FormValues, type FormConfig } from '../form.types';

export default function getInitialValues<
  D extends object,
  Z extends z.ZodTypeAny,
>({
  data,
  formConfig,
}: {
  data: D;
  formConfig: FormConfig<D, Z>;
}): FormValues<Z> {
  return Object.fromEntries(
    formConfig.map((field) => [field.path, field.getInitialValue(data)])
  );
}
