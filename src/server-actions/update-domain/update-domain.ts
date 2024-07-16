'use server';

import SECURITY_TOKEN from '@/config/auth/security-token';
import * as grpcClient from '@/utils/grpc/grpc-client';

import updateDomainValuesSchema from './schemas/update-domain-values-schema';
import { type Props, type UpdateDomainResponse } from './update-domain.types';

export default async function updateDomain(
  props: Props
): Promise<UpdateDomainResponse> {
  const { data: values, error } = updateDomainValuesSchema.safeParse(
    props.values
  );
  if (error) {
    throw new Error('Invalid values: ' + error.message);
  }

  try {
    const res = await grpcClient.getClusterMethods(props.cluster).updateDomain({
      ...props.values,
      name: props.domain,
      securityToken: SECURITY_TOKEN,
      updateMask: { paths: Object.keys(values) },
    });

    if (!res.domain) {
      throw new Error('Received empty response');
    }
    return res.domain;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : 'Unknown');
  }
}
