import React from 'react';

import { Alert } from 'baseui/icon';
import { Tag } from 'baseui/tag';

import { DOMAIN_STATUS_NAMES } from './domain-status-tag.constants';
import { overrides } from './domain-status-tag.styles';
import { type Props } from './domain-status-tag.types';

export default function DomainStatusTag(props: Props) {
  return (
    <Tag closeable={false} overrides={overrides.tag}>
      <Alert />
      {DOMAIN_STATUS_NAMES[props.status]}
    </Tag>
  );
}
