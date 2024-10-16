import { createElement, Suspense } from 'react';

import {
  MdListAlt,
  MdOutlineHistory,
  MdOutlineManageSearch,
  MdOutlineTerminal,
} from 'react-icons/md';

import WorkflowHistoryPendingBadge from '@/views/workflow-history/workflow-history-pending-badge/workflow-history-pending-badge';

import type { WorkflowPageTabs } from '../workflow-page-tabs/workflow-page-tabs.types';

const workflowPageTabsConfig = [
  {
    key: 'summary',
    title: 'Summary',
    artwork: MdListAlt,
  },
  {
    key: 'history',
    title: 'History',
    badge: createElement(WorkflowHistoryPendingBadge),
    artwork: MdOutlineHistory,
  },
  {
    key: 'queries',
    title: 'Queries',
    artwork: MdOutlineManageSearch,
  },
  {
    key: 'stackTrace',
    title: 'Stack Trace',
    artwork: MdOutlineTerminal,
  },
] as const satisfies WorkflowPageTabs;

export default workflowPageTabsConfig;
