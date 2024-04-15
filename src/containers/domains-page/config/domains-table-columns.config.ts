import { TableColumn } from '@/layout/table/table.types';
import { DomainData } from '../domains-page.types';
import DomainsTableClusterCell from '../domains-table-cluster-cell/domains-table-cluster-cell';
import DomainsTableDomainNameCell from '../domains-table-domain-name-cell/domains-table-domain-name-cell';

export const domainTableColumns: Array<TableColumn<DomainData>> = [
  {
<<<<<<< HEAD
    name: 'Domain Name',
    id: 'name',
=======
    name: "Domain Name",
    id: "name",
>>>>>>> 07a5e6f (Refactor and add unit tests for Table component)
    renderCell: DomainsTableDomainNameCell,
    sortable: true,
  },
  {
<<<<<<< HEAD
    name: 'Cluster',
    id: 'cluster',
=======
    name: "Cluster",
    id: "cluster",
>>>>>>> 07a5e6f (Refactor and add unit tests for Table component)
    renderCell: DomainsTableClusterCell,
  },
];
