import { type UpdateDomainRequest__Input } from '@/__generated__/proto-ts/uber/cadence/api/v1/UpdateDomainRequest';
import { type DomainInfo } from '@/views/domain-page/domain-page.types';

export type Props = {
  domain: string;
  cluster: string;
  values: UpdateDomainRequest__Input;
};

export type UpdateDomainResponse = DomainInfo;
