'use server';

import * as grpcClient from '@/utils/grpc/grpc-client';
import { GRPCError } from '@/utils/grpc/grpc-error';

import { type Props, type UpdateDomainResponse } from './update-domain.types';

export default async function updateDomain(
  props: Props
): Promise<UpdateDomainResponse> {
  // Zod input validation

  try {
    const res = await grpcClient.getClusterMethods(props.cluster).updateDomain({
      ...props.values,
      name: props.domain,
      updateMask: { paths: Object.keys(props.values) },
    });

    if (!res.domain) {
      throw new Error('test');
    }
    return res.domain;
  } catch (e) {
    throw new Error(
      'Error updating domain info: ' +
        (e instanceof GRPCError ? e.message : 'Unknown error')
    );
  }
}
