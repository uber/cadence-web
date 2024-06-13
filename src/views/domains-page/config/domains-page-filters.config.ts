import { type DomainsPageFiltersConfig } from '../domains-page-filters/domains-page-filters.types';
import DomainsPageFiltersClusterName from '../domains-page-filters-cluster-name/domains-page-filters-cluster-name';

const domainsPageFiltersConfig = [
  {
    id: 'clusterName',
    filterFunc: (domain, queryParams) =>
      Boolean(
        !queryParams.clusterName ||
          domain.clusters.find((c) => c.clusterName === queryParams.clusterName)
      ),
    component: DomainsPageFiltersClusterName,
    queryParamKeys: ['clusterName'],
  },
] as const satisfies DomainsPageFiltersConfig;

export default domainsPageFiltersConfig;