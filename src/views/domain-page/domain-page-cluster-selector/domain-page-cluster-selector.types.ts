import { ClusterReplicationConfiguration } from '../domain-page.types';

export type Props = {
  selectedCluster: string;
  availableClusters: Array<ClusterReplicationConfiguration>;
};
