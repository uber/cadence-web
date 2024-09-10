'use client';
import React from 'react';

import Table from '@/components/table/table';
import { type TaskList } from '@/route-handlers/describe-task-list/describe-task-list.types';

import taskListWorkersTableConfig from '../config/task-list-workers-table.config';

export default function TaskListWorkersTable(props: { taskList: TaskList }) {
  return (
    <Table
      data={props.taskList.pollers}
      columns={taskListWorkersTableConfig}
      shouldShowResults={true}
      onSort={() => {}}
      endMessage={null}
    />
  );
}
