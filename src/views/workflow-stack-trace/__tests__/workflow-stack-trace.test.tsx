import { Suspense } from 'react';

import { HttpResponse } from 'msw';

import { act, render, screen, userEvent } from '@/test-utils/rtl';

import { type QueryWorkflowResponse } from '@/route-handlers/query-workflow/query-workflow.types';

import WorkflowStackTrace from '../workflow-stack-trace';

jest.mock('@/components/error-panel/error-panel', () =>
  jest.fn(() => <div>Error Panel</div>)
);

jest.mock('baseui/skeleton', () => ({
  Skeleton: jest.fn(() => <div>Loading Skeleton</div>),
}));

describe('WorkflowStackTrace', () => {
  it('should render correctly with no fetching or error', async () => {
    await setup({ resultStackTrace: 'result stack trace' });
    expect(screen.getByText(/Last updated/)).toBeInTheDocument();
    expect(screen.getByText('result stack trace')).toBeInTheDocument();
    expect(screen.queryByText('Error Panel')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading Skeleton')).not.toBeInTheDocument();
  });

  it('should show loading state on refetch', async () => {
    const { getRequestResolver } = await setup({ wait: true });
    const initResolver = getRequestResolver();
    initResolver();

    const button = await screen.findByRole('button', { name: /Refresh/i });
    await act(async () => {
      await userEvent.click(button);
    });
    expect(screen.getByText('Loading Skeleton')).toBeInTheDocument();
    expect(screen.queryByText('Error Panel')).not.toBeInTheDocument();
    expect(screen.queryByText('test stack trace')).not.toBeInTheDocument();

    const refetchResolver = getRequestResolver();
    refetchResolver();
    expect(await screen.findByText('test stack trace')).toBeInTheDocument();
    expect(screen.queryByText('Loading Skeleton')).not.toBeInTheDocument();
    expect(screen.queryByText('Error Panel')).not.toBeInTheDocument();
  });
});

async function setup({
  error,
  wait,
  resultStackTrace = 'test stack trace',
}: {
  error?: boolean;
  wait?: boolean;
  resultStackTrace?: string;
}) {
  let requestResolver = () => {};
  let requestRejector = () => {};
  const getRequestResolver = () => requestResolver;
  const getRequestRejector = () => requestRejector;
  await act(async () => {
    render(
      <Suspense fallback="Suspense placeholder">
        <WorkflowStackTrace
          params={{
            domain: 'test-domain',
            cluster: 'test-cluster',
            runId: 'test-runid',
            workflowId: 'test-workflowId',
            workflowTab: 'stackTrace',
          }}
        />
      </Suspense>,
      {
        endpointsMocks: [
          {
            path: '/api/domains/:domain/:cluster/workflows/:workflowId/:runId/query/__stack_trace',
            httpMethod: 'POST',
            mockOnce: false,
            httpResolver: async () => {
              if (wait) {
                await new Promise<void>((resolve) => {
                  requestResolver = () => {
                    resolve();
                  };
                  requestRejector = () => {
                    resolve();
                  };
                });
              }
              if (error)
                return HttpResponse.json(
                  { message: 'Failed to fetch workflow stack trace' },
                  { status: 500 }
                );

              return HttpResponse.json(
                {
                  rejected: null,
                  result: resultStackTrace,
                } satisfies QueryWorkflowResponse,
                { status: 200 }
              );
            },
          },
        ],
      }
    );
  });

  return { getRequestResolver, getRequestRejector };
}
