import { Suspense } from 'react';

import { render, screen, act } from '@/test-utils/rtl';

import DomainTaskLists from '../domain-tasklists';

describe(DomainTaskLists.name, () => {
  it('renders tasklists without error', async () => {
    await setup({});

    expect(await screen.findByText('Mock metadata table')).toBeInTheDocument();
    expect(
      screen.getByText('Domain ID: mock-domain-staging-uuid')
    ).toBeInTheDocument();
    expect(screen.getByText('Active cluster: cluster_1')).toBeInTheDocument();
  });

  it('does not render if the initial call fails', async () => {
    let renderErrorMessage;
    try {
      await act(async () => {
        await setup({ error: true });
      });
    } catch (error) {
      if (error instanceof Error) {
        renderErrorMessage = error.message;
      }
    }

    expect(renderErrorMessage).toEqual('Failed to fetch domain metadata');
  });
});

async function setup({ error }: { error?: boolean }) {
  render(
    <Suspense>
      <DomainTaskLists domain="mock-domain" cluster="mock-cluster" />
    </Suspense>,
    {
      endpointsMocks: [
        {
          path: '/api/domains/:domain/:cluster/tasklists',
          httpMethod: 'GET',
          ...(error
            ? { httpResolver: () => Promise.reject('Something went wrong') }
            : {
                jsonResponse: {
                  taskLists: [
                    {
                      name: 'tasklist-1',
                      pollers: [
                        {
                          activityHandler: true,
                          decisionHandler: true,
                          identity: 'poller-1@mock-domain@tasklist-1',
                          lastAccessTime: 1725370657336.2053,
                          ratePerSecond: 100000,
                        },
                        {
                          activityHandler: true,
                          decisionHandler: true,
                          identity: 'poller-2@mock-domain@tasklist-1',
                          lastAccessTime: 1725370636402.4927,
                          ratePerSecond: 100000,
                        },
                      ],
                    },
                  ],
                },
              }),
        },
      ],
    }
  );
}
