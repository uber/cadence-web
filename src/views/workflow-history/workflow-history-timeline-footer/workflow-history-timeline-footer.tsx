import React from 'react';

import { Spinner } from 'baseui/spinner';

import { styled } from './workflow-history-timeline-footer.styles';
import { type Props } from './workflow-history-timeline-footer.types';

export default function WorkflowHistoryTimelineLoadMore(props: Props) {
  if (props.hasNextPage || props.isFetchingNextPage) {
    return (
      <styled.SpinnerContainer>
        <Spinner data-testid="loading-spinner" />
      </styled.SpinnerContainer>
    );
  }

  if (props.error) {
    return (
      <styled.EndMessageContainer $isError={true}>
        Failed to load more items.{' '}
        <styled.RetryLink
          onClick={() => props.fetchNextPage()}
          target="_blank"
          rel="noreferrer"
        >
          Retry manually
        </styled.RetryLink>
      </styled.EndMessageContainer>
    );
  }

  return null;
}
