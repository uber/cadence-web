'use client';

import PageSection from '@/components/page-section/page-section';
import useInfiniteScrollRef from '@/hooks/use-infinite-scroll-ref';

import { type DomainPageTabContentProps } from '../domain-page-content/domain-page-content.types';

// Component to fetch table data and display it
export default function DomainPageWorkflowsTable(
  props: DomainPageTabContentProps
) {
  const targetRef = useInfiniteScrollRef({
    fetchResults: fetchNextPage,
    isFetchingResults: isFetchingNextPage,
  });

  return <PageSection></PageSection>;
}
