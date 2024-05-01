import type { DomainInfo } from '../domain-page.types';

type LoadingProps = {
  loading: true;
}

type LoadedProps = {
  loading: false;
  domainInfo: DomainInfo;
  cluster: string;
}

export type Props = LoadingProps | LoadedProps;
