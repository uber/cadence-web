import type { HistoryGroupEventMetadata } from '../workflow-history.types';

export type Props = {
  eventsMetadata: Pick<HistoryGroupEventMetadata, 'label' | 'status'>[];
};
