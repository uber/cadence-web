'use client';
import React, { Suspense } from 'react';

import { type WorkflowPageTabContentProps } from '@/views/workflow-page/workflow-page-tab-content/workflow-page-tab-content.types';

import WorkflowQueriesLoader from './workflow-queries-loader/workflow-queries-loader';

export default function WorkflowQueries(props: WorkflowPageTabContentProps) {
<<<<<<< HEAD
=======
  // getQueries - useSuspenseQuery around the fetchWorkflowQueryTypes endpoint
  // generate (Query name, input) in an array or record <{name: string, input: any}> as a state
  // useQueries hook (map query and name to generate the argument for useQueries)
  // For each query card, pass the query response (for the response state icon)

  // To run the query, hit the run button, this should call refetch()
  // Clear query if input is removed
  // Pass each query tile the respective query, and pass the window the active query

>>>>>>> fa52add (Add more changes)
  return (
    <Suspense>
      <WorkflowQueriesLoader {...props.params} />
    </Suspense>
  );
}
