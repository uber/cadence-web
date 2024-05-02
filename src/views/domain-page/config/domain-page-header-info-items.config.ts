import DomainPageClusterSelector from '../domain-page-cluster-selector/domain-page-cluster-selector';
import { DomainPageHeaderInfoItemsConfig } from '../domain-page-header-info/domain-page-header-info.types';

const domainPageHeaderInfoItemsConfig = [
  {
    title: 'Cluster',
    getContent: DomainPageClusterSelector,
  },
  {
    title: 'Global/Local',
    getContent: (props) =>
      props.domainInfo.isGlobalDomain ? 'Global' : 'Local',
  },
  {
    title: 'Domain ID',
    getContent: (props) => props.domainInfo.id,
  },
] as const satisfies DomainPageHeaderInfoItemsConfig;

export default domainPageHeaderInfoItemsConfig;
