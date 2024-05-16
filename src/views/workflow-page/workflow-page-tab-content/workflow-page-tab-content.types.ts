import { worflowPageTabsConfig } from '../config/workflow-page-tabs.config';
import type { WorkflowPageTabsParams } from '../workflow-page-tabs/workflow-page-tabs.types';



export type WorkflowPageTabsContentsMap = {
  [k in (typeof worflowPageTabsConfig)[number]['key']]:
  | React.ComponentType<WorkflowPageTabContentProps>
  | ((props: WorkflowPageTabContentProps) => React.ReactNode);
}


export type WorkflowPageTabContentParams = {
  domain: string;
  cluster: string;
  workflowId: string;
  runId: string;
  workflowTab: (typeof worflowPageTabsConfig)[number]['key'];
}

export type WorkflowPageTabContentProps = {
  params: WorkflowPageTabsParams;
};

export type Props = {
  params: WorkflowPageTabsParams;
  tabsContentMap?: WorkflowPageTabsContentsMap;
};
