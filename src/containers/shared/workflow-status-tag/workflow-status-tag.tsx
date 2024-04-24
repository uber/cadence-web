import React from 'react';
import { Tag, VARIANT } from 'baseui/tag';

import type {
  WorkflowStatus,
  WorkflowStatusTagProps,
} from './workflow-status-tag.types';
import WorkflowStatusTagIcon from './workflow-status-tag-icon/workflow-status-tag-icon';
import { overrides } from './workflow-status-tag.styles';

const WORKFLOW_STATUS_NAMES: Record<WorkflowStatus, string> = {
  running: 'Running',
  completed: 'Completed',
  failed: 'Failed',
  canceled: 'Canceled',
  terminated: 'Terminated',
  continuedAsNew: 'Continued As New',
  timedOut: 'Timed Out',
  unknown: 'Unknown',
};

export default function WorkflowStatusTag(props: WorkflowStatusTagProps) {
  if (props.link) {
    return (
      <a target="_blank" rel="noreferrer" href={props.link}>
        <WorkflowStatusTagBase {...props} />
      </a>
    );
  }

  return <WorkflowStatusTagBase {...props} />;
}

function WorkflowStatusTagBase(props: WorkflowStatusTagProps) {
  return (
    <Tag
      variant={VARIANT.solid}
      closeable={false}
      overrides={overrides({ status: props.status }).tag}
      {...(props.link && {
        onClick: (event) => {
          event.stopPropagation();
          window.open(props.link);
        },
      })}
    >
      <WorkflowStatusTagIcon
        kind="start"
        status={props.status}
        link={props.link}
      />
      {WORKFLOW_STATUS_NAMES[props.status]}
      <WorkflowStatusTagIcon
        kind="end"
        status={props.status}
        link={props.link}
      />
    </Tag>
  );
}
