import { MdListAlt } from 'react-icons/md';
import type { WorkflowPageTabs } from '../workflow-page-tabs/workflow-page-tabs.types';

export const worflowPageTabsConfig = [
  {
    key: 'summary',
    title: 'Summary',
    artwork: MdListAlt,
  },
] as const satisfies WorkflowPageTabs;
