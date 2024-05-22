import type { WorkflowPageTabsContentsMap } from '../workflow-page-tab-content/workflow-page-tab-content.types';

const worflowPageTabsContentsMapConfig = {
  // TODO: @assem.hafez add summary tab
  summary: (props: any) => null,
} as const satisfies WorkflowPageTabsContentsMap;

export default worflowPageTabsContentsMapConfig;
