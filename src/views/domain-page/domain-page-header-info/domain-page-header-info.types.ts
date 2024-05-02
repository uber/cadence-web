import type { DomainInfo } from '../domain-page.types';

type LoadingProps = {
  loading: true;
};

type LoadedProps = {
  loading: false;
  domainInfo: DomainInfo;
  cluster: string;
};

export type Props = LoadingProps | LoadedProps;

export type DomainHeaderInfoItemContentProps = {
  domainInfo: DomainInfo;
  cluster: string;
};

type DomainPageHeaderInfoItem = {
  title: string;
  getContent: (
    props: DomainHeaderInfoItemContentProps
  ) => string | React.ReactElement;
};

export type DomainPageHeaderInfoItemsConfig = Array<DomainPageHeaderInfoItem>;
