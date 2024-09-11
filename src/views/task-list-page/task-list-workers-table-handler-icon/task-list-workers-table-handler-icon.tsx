import { MdCheckCircleOutline, MdRadioButtonUnchecked } from 'react-icons/md';

import { styled } from './task-list-workers-table-handler-icon.styles';

export default function TaskListWorkersTableHandlerIcon(props: {
  hasHandler: boolean;
}) {
  const Icon = props.hasHandler ? MdCheckCircleOutline : MdRadioButtonUnchecked;

  return (
    <styled.IconContainer $hasHandler={props.hasHandler}>
      <Icon size="24px" display="block" />
    </styled.IconContainer>
  );
}
