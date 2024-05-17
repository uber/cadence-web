import type { PageQueryParams } from '@/hooks/use-page-query-params/use-page-query-params.types';

export const defaultParamA = 'valueA1';
export const defaultParamB = 'valueB1';
export const mockPageQueryParamConfig: PageQueryParams = [
  { key: 'search' },
  { key: 'paramA', defaultValue: defaultParamA },
  { key: 'paramB', defaultValue: defaultParamB },
];
export const mockQueryParamsValues = {
  search: '',
  paramA: defaultParamA,
  paramB: defaultParamB,
};
