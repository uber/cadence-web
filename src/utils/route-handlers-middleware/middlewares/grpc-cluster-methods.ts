import { isObjectLike } from 'lodash';

import decodeUrlParams from '@/utils/decode-url-params';
import {
  type GRPCClusterMethods,
  getClusterMethods,
} from '@/utils/grpc/grpc-client';
import { type GRPCMetadata } from '@/utils/grpc/grpc-service';

import { type MiddlewareFunction } from '../route-handlers-middleware.types';

const keyValuesAreStrings = (v: any): v is Record<string, string> => {
  return (
    isObjectLike(v) &&
    Object.entries(v).every(
      ([key, value]) => typeof key === 'string' && typeof value === 'string'
    )
  );
};

const grpcClusterMethods: MiddlewareFunction<
  ['grpcClusterMethods', GRPCClusterMethods]
> = (_, { params }, context) => {
  let grpcMetadata: GRPCMetadata | undefined;
  if (keyValuesAreStrings(context.grpcMetadata)) {
    grpcMetadata = context.grpcMetadata;
  }

  if (!params.cluster) {
    throw new Error(`Cluster not found: ${params.cluster}`);
  }

  const decodedParams = decodeUrlParams(params);

  return [
    'grpcClusterMethods',
    getClusterMethods(decodedParams.cluster, grpcMetadata),
  ];
};

export default grpcClusterMethods;
