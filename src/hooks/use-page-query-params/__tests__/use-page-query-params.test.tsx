import { renderHook, act } from '@/test-utils/rtl';

import { queryParamsConfig } from '../__fixtures__/page-query-params.fixtures';
import usePageQueryParams from '../use-page-query-params';

jest.mock('next/navigation', () => require('next-router-mock/navigation'));

describe('usePageQueryParams', () => {
  const originalWindowLocation = window.location;
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: originalWindowLocation,
      writable: true,
    });
  });

  it('should return default values when search is empty', () => {
    const { result } = renderHook(() => usePageQueryParams(queryParamsConfig));
    const [values] = result.current;
    expect(values).toStrictEqual({
      sortBy: undefined,
      aliased: undefined,
      defaulted: 'defaultValue',
      parsed: undefined,
      parsedMultiVal: undefined,
      multiValDefaulted: ['a'],
    });
  });

  it('should update values by calling the single key setter method', async () => {
    const { result } = renderHook(() => usePageQueryParams(queryParamsConfig));
    const [, setValues] = result.current;

    act(() => {
      setValues({ sortBy: 'a' });
    });

    const [values] = result.current;
    expect(values).toStrictEqual({
      sortBy: 'a',
      aliased: undefined,
      defaulted: 'defaultValue',
      parsed: undefined,
      parsedMultiVal: undefined,
      multiValDefaulted: ['a'],
    });
  });

  it('should update values by calling the multiple keys setter method', async () => {
    const { result } = renderHook(() => usePageQueryParams(queryParamsConfig));
    const [, setValues] = result.current;

    act(() => {
      setValues({
        sortBy: 'a',
        defaulted: 'nonDefaultValue',
        aliased: 'b',
        parsed: '2',
        parsedMultiVal: ['1', '2'],
        multiValDefaulted: ['a', 'a'],
      });
    });

    const [values] = result.current;
    expect(values).toStrictEqual({
      sortBy: 'a',
      aliased: 'b',
      defaulted: 'nonDefaultValue',
      parsed: 2,
      parsedMultiVal: [1, 2],
      multiValDefaulted: ['a', 'a'],
    });
  });

  it('should get search values from window.location.search on first client side render', async () => {
    Object.defineProperty(window, 'location', {
      value: {
        ...originalWindowLocation,
        search: '?sortBy=sortByValue1',
      },
      writable: true,
    });

    const { result } = renderHook(() => usePageQueryParams(queryParamsConfig));
    const [values] = result.current;

    expect(values).toStrictEqual({
      sortBy: 'sortByValue1',
      aliased: undefined,
      defaulted: 'defaultValue',
      parsed: undefined,
      parsedMultiVal: undefined,
      multiValDefaulted: ['a'],
    });
  });

  it('writes History with null state so Next can sync search params', async () => {
    const pushState = jest.spyOn(window.history, 'pushState');
    const { result } = renderHook(() => usePageQueryParams(queryParamsConfig));
    const [, setValues] = result.current;

    await act(async () => {
      setValues({ sortBy: 'from-history' });
      await Promise.resolve();
    });

    expect(pushState).toHaveBeenCalled();
    const stateArg = pushState.mock.calls.at(-1)?.[0];
    expect(stateArg).toBeNull();
    pushState.mockRestore();
  });
});
