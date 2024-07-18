import React, { useState } from 'react';

import {
  QueryClient,
  type QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

import StyletronProvider from '@/providers/styletron-provider';

import MSWTestController from './msw-tests-controller/msw-tests-controller';
import { type Props } from './test-provider.types';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const getQueryClient = (config: QueryClientConfig) =>
  new QueryClient(
    Object.assign(
      {},
      {
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: Infinity,
            retryOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      },
      config
    )
  );
/**
 * Don't use this directly. Use render from rtl.tsx instead.
 */
export const TestProvider = ({
  children,
  router = {
    initialUrl: '/',
    pathnames: [],
  },
  queryClientConfig = {},
  endpointsMocks,
}: Props) => {
  const [client] = useState(() => getQueryClient(queryClientConfig));
  return (
    <StyletronProvider>
      <MSWTestController endpointsMocks={endpointsMocks} />
      <MemoryRouterProvider url={router.initialUrl}>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </MemoryRouterProvider>
    </StyletronProvider>
  );
};
