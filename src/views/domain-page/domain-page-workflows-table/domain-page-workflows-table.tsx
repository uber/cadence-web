'use client';

import React from 'react';
import { Button } from 'baseui/button';
import { DomainPageTabContentProps } from '../domain-page-content/domain-page-content.types';
import { listCachedWorkflowExecutions } from '../actions/list-workflow-executions';
import { DomainWorkflow } from '../domain-page.types';

export default function DomainPageWorkflowsTable(
  props: DomainPageTabContentProps & {
    initialResults: Array<DomainWorkflow>;
    nextPage: string;
  }
) {
  const [fetchMore, setFetchMore] = React.useState(false);
  const [res, setRes] = React.useState<Array<DomainWorkflow>>(
    props.initialResults
  );
  const [nextPage, setNextPage] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    const getResults = async () => {
      const res = await listCachedWorkflowExecutions(props.cluster, {
        domain: props.domain,
        nextPage: nextPage,
      });
      setRes((resSoFar) => [...resSoFar, ...res.workflows]);
      setNextPage(res.nextPage);
    };

    if (fetchMore) {
      getResults();
      setFetchMore(false);
    }
  }, [fetchMore, props, nextPage]);

  return (
    <div>
      {JSON.stringify(res, null, '\b')}
      <Button onClick={() => setFetchMore(true)}>Load more</Button>
    </div>
  );
}
