import { memo, useEffect } from 'react';

import { server } from '@/utils/msw/node';

import mswMockEndpoints from './helper/msw-mock-endpoints';
import { type Props } from './msw-tests-controller.types';

export default memo(function MSWTestController({ endpointsMocks }: Props) {
  server.listen();
  server.resetHandlers();
  if (endpointsMocks) mswMockEndpoints(endpointsMocks);

  //close server on unmount
  useEffect(() => {
    return () => server.close();
  }, []);

  return null;
});
