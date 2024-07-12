'use server';

import { type UpdateDomainRequest__Input } from '@/__generated__/proto-ts/uber/cadence/api/v1/UpdateDomainRequest';

export default async function updateDomain(
  domainData: UpdateDomainRequest__Input
) {
  console.log('A');
  await new Promise((resolve) => setTimeout(resolve, 10000));
  console.log('B');
}
