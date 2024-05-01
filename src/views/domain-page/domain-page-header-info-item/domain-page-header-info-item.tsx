import React from 'react';

import { styled } from './domain-page-header-info-item.styles';
import { Props } from './domain-page-header-info-item.types';

export default function DomainPageHeaderInfoItem(props: Props) {
  return (
    <styled.ItemContainer>
      <styled.ItemTitle>{props.title}</styled.ItemTitle>
      {props.loading ? <div>spinner</div> : typeof props.content === 'string' ? (
        <styled.ItemLabel>{props.content}</styled.ItemLabel>
      ) : (
        <div>{props.content}</div>
      )}
    </styled.ItemContainer>
  );
}
