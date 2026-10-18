import { useCallback, useEffect, useMemo, useState } from 'react';

import isObjectLike from 'lodash/isObjectLike';
import { useSearchParams } from 'next/navigation';
import queryString from 'query-string';

import getPageQueryParamsValues from './helpers/get-page-query-params-values';
import getUpdatedUrlSearch from './helpers/get-updated-url-search';
import type {
  PageQueryParamSetter,
  PageQueryParamValues,
  PageQueryParams,
  QueryParamSetterExtraConfig,
} from './use-page-query-params.types';

/** Cross-instance refresh after History(null) writes (no use-between). */
const QUERY_PARAMS_SYNC_EVENT = 'cadence:page-query-params';

function readWindowSearch(): string {
  if (typeof window === 'undefined') return '';
  return window.location.search.replace(/^\?/, '');
}

export default function usePageQueryParams<P extends PageQueryParams>(
  config: P,
  extraConfig?: QueryParamSetterExtraConfig
): [PageQueryParamValues<P>, PageQueryParamSetter<P>] {
  const searchQueryParams = useSearchParams();
  const [clientSearch, setClientSearch] = useState<string | null>(null);

  useEffect(() => {
    const syncFromWindow = () => {
      // Defer setState out of the History / Event dispatch turn (React 18).
      queueMicrotask(() => setClientSearch(readWindowSearch()));
    };
    window.addEventListener('popstate', syncFromWindow);
    window.addEventListener(QUERY_PARAMS_SYNC_EVENT, syncFromWindow);
    return () => {
      window.removeEventListener('popstate', syncFromWindow);
      window.removeEventListener(QUERY_PARAMS_SYNC_EVENT, syncFromWindow);
    };
  }, []);

  // Prefer Next searchParams when they change (App Router sync after null-state History).
  useEffect(() => {
    setClientSearch(null);
  }, [searchQueryParams]);

  const search = useMemo(() => {
    if (clientSearch !== null) return clientSearch;
    if (typeof window !== 'undefined') return readWindowSearch();
    return searchQueryParams.toString();
  }, [clientSearch, searchQueryParams]);

  const values: PageQueryParamValues<P> = useMemo(() => {
    const urlQueryParamsObject = queryString.parse(search);
    return getPageQueryParamsValues<P>(config, urlQueryParamsObject);
  }, [config, search]);

  const setter = useCallback<PageQueryParamSetter<P>>(
    (newParams, setterExtraConfig) => {
      if (!isObjectLike(newParams) || typeof window === 'undefined') {
        return;
      }
      const replace =
        setterExtraConfig?.replace ?? extraConfig?.replace ?? false;

      const searchAtCall = window.location.search;
      const pathAtCall = window.location.pathname;
      const updatedUrlSearch = getUpdatedUrlSearch(
        config,
        newParams,
        searchAtCall
      );
      const newHref =
        pathAtCall + (updatedUrlSearch ? `?${updatedUrlSearch}` : '');
      const currentHref = pathAtCall + searchAtCall;
      if (newHref === currentHref) {
        return;
      }

      // Optimistic local update (jsdom mocks of location.search often ignore pushState).
      setClientSearch(updatedUrlSearch);

      const writeHistory = () => {
        if (replace) {
          window.history.replaceState(null, '', newHref);
        } else {
          window.history.pushState(null, '', newHref);
        }
        window.dispatchEvent(new Event(QUERY_PARAMS_SYNC_EVENT));
      };
      // Defer past mount effects so Next's History patch is in place (edge-R004-A1).
      queueMicrotask(writeHistory);
    },
    [extraConfig?.replace, config]
  );

  return [values, setter];
}
