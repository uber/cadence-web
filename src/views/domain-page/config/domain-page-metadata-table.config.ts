import type { ListTableItem } from '@/components/list-table/list-table.types';

import { type DomainInfo } from '../domain-page.types';

const domainPageMetadataTableConfig: Array<ListTableItem<DomainInfo>> = [
  {
    key: 'domainId',
    label: 'Domain ID',
    renderValue: (domainInfo: DomainInfo) => domainInfo.id,
  },
  {
    key: 'owner',
    label: 'Owner',
    renderValue: (domainInfo: DomainInfo) => domainInfo.ownerEmail,
  },
  {
    key: 'clusters',
    label: 'Clusters',
    renderValue: (domainInfo: DomainInfo) => domainInfo.activeClusterName, // create a new Clusters component
  },
  {
    key: 'globalOrLocal',
    label: 'Global/Local',
    renderValue: (domainInfo: DomainInfo) =>
      domainInfo.isGlobalDomain ? 'Global' : 'Local',
  },
  {
    key: 'failoverVersion',
    label: 'Failover version',
    renderValue: (domainInfo: DomainInfo) => domainInfo.failoverVersion,
  },
];

export default domainPageMetadataTableConfig;
