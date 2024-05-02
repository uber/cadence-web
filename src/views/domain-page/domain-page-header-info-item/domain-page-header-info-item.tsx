import React from 'react';
import { Skeleton } from 'baseui/skeleton';

import { overrides, styled } from './domain-page-header-info-item.styles';
import { Props } from './domain-page-header-info-item.types';

export default function DomainPageHeaderInfoItem(props: Props) {
  return (
    <styled.ItemContainer>
      <styled.ItemTitle>{props.title}</styled.ItemTitle>
      {props.loading ? (
        <Skeleton
          width={props.placeholderSize}
          overrides={overrides.skeleton}
          animation={true}
        />
      ) : typeof props.content === 'string' ? (
        <styled.ItemLabel>{props.content}</styled.ItemLabel>
      ) : (
        <div>{props.content}</div>
      )}
    </styled.ItemContainer>
  );
}
