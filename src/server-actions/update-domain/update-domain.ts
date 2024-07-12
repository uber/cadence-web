'use server';

import * as grpcClient from '@/utils/grpc/grpc-client';

import { type Props, type UpdateDomainResponse } from './update-domain.types';

export default async function updateDomain(
  props: Props
): Promise<UpdateDomainResponse> {
  // Zod input validation

  // Calling GRPC with try-catch
  try {
    const res = await grpcClient
      .getClusterMethods(props.cluster)
      .updateDomain({ ...props.values, name: props.domain }); // and the rest of the payload

    if (!res.domain) {
      throw new Error('test');
    }
    return res.domain;
  } catch {
    throw new Error('Error updating domain info');
  }
}
