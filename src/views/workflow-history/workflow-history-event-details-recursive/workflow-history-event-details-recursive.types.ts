import { type WorkflowPageTabsParams } from '@/views/workflow-page/workflow-page-tabs/workflow-page-tabs.types';

export type Props = {
  details: object;
  prefix?: string;
  decodedPageUrlParams: WorkflowPageTabsParams;
};
