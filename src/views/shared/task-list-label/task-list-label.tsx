import { Tag, KIND, VARIANT } from 'baseui/tag';

import { type TaskList } from '@/route-handlers/describe-task-list/describe-task-list.types';

import { styled, overrides } from './task-list-label.styles';

export default function TaskListLabel(props: { taskList: TaskList }) {
  return (
    <styled.LabelContainer>
      {props.taskList.name}
      <Tag
        kind={KIND.accent}
        variant={VARIANT.solid}
        closeable={false}
        overrides={overrides.tag}
      >
        {props.taskList.pollers.length} workers
      </Tag>
    </styled.LabelContainer>
  );
}
