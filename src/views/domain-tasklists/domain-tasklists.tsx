'use client';
import React from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import PageSection from '@/components/page-section/page-section';
import { type ListTaskListsByDomainResponse } from '@/route-handlers/list-task-lists-by-domain/list-task-lists-by-domain.types';
import request from '@/utils/request';
import { type DomainPageTabContentProps } from '@/views/domain-page/domain-page-content/domain-page-content.types';

import { styled } from './domain-tasklists.styles';

export default function DomainTaskLists(props: DomainPageTabContentProps) {
  const {
    data: { taskLists },
  } = useSuspenseQuery<ListTaskListsByDomainResponse>({
    queryKey: ['listTaskListsByDomain', props],
    queryFn: () =>
      request(
        `/api/domains/${props.domain}/${props.cluster}/tasklist/cadence-sys-batcher-tasklist`
      ).then((res) => res.json()),
  });

  if (taskLists.length === 0) {
    throw new Error('No tasklist found for this domain');
  }

  return (
    <PageSection>
      <styled.TaskListsContainer>
        {/* <DomainTaskListsFilters /> */}
        {/* <DomainTaskListsTable taskLists={taskLists} /> */}
        <div>Placeholder</div>
        <div>{JSON.stringify(taskLists)}</div>
      </styled.TaskListsContainer>
    </PageSection>
  );
}
