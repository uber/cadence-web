import { Tag, KIND, VARIANT } from 'baseui/tag';

import { type TaskList } from '@/route-handlers/describe-task-list/describe-task-list.types';

import { styled, overrides } from './task-list-label.styles';

export default function TaskListLabel(props: {
  taskList: TaskList;
  isHighlighted?: boolean;
}) {
  const numWorkers = props.taskList.pollers.length;
  return (
    <styled.LabelContainer $isHighlighted={props.isHighlighted}>
      {props.taskList.name}
      <Tag
        kind={numWorkers === 0 ? KIND.negative : KIND.accent}
        variant={VARIANT.solid}
        closeable={false}
        overrides={overrides.tag}
      >
        {`${numWorkers} ${numWorkers === 1 ? 'worker' : 'workers'}`}
      </Tag>
    </styled.LabelContainer>
  );
}
