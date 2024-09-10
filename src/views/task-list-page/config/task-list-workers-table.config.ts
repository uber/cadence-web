import { createElement } from 'react';

import { MdCheck, MdHorizontalRule } from 'react-icons/md';

import FormattedDate from '@/components/formatted-date/formatted-date';
import { type TableColumn } from '@/components/table/table.types';
import { type Poller } from '@/route-handlers/describe-task-list/describe-task-list.types';

const taskListWorkersTableConfig: Array<TableColumn<Poller>> = [
  {
    name: 'Identity',
    id: 'identity',
    renderCell: (row: Poller) => row.identity,
    width: '50%',
  },
  {
    name: 'Last Access Time',
    id: 'LastAccessTime',
    renderCell: (row: Poller) =>
      createElement(FormattedDate, { timestampMs: row.lastAccessTime }),
    width: '30%',
  },
  {
    name: 'Decision Handler',
    id: 'decisionHandler',
    renderCell: (row: Poller) =>
      createElement(row.decisionHandler ? MdCheck : MdHorizontalRule),
    width: '10%',
  },
  {
    name: 'Activity Handler',
    id: 'activityHandler',
    renderCell: (row: Poller) =>
      createElement(row.activityHandler ? MdCheck : MdHorizontalRule),
    width: '10%',
  },
];

export default taskListWorkersTableConfig;
