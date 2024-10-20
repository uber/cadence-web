import { type GRPCClusterMethods } from '@/utils/grpc/grpc-client';

import grpcClusterMethods from '../middlewares/grpc-cluster-methods';
import { type MiddlewareFunction } from '../route-handlers-middleware.types';

const routeHandlersDefaultMiddlewares: [
  MiddlewareFunction<['grpcClusterMethods', GRPCClusterMethods]>,
] = [grpcClusterMethods];

export default routeHandlersDefaultMiddlewares;
