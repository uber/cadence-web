import React from 'react';
import { render } from '@/test-utils/rtl';
import WorkflowPageTabs from '../workflow-page-tabs';
import type { WorkflowPageTabsParams } from '../workflow-page-tabs.types';
import workflowPageTabsConfig from '../../config/workflow-page-tabs.config';

const mockPushFn = jest.fn();
//TODO @assem.hafez  create testing util for router
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({
    push: mockPushFn,
    back: () => { },
    replace: () => { },
    forward: () => { },
    prefetch: () => { },
    refresh: () => { },
  }),
  useParams: () => ({
    cluster: 'example-cluster',
    domain: 'example-domain',
    runId: 'example-runId',
    workflowId: 'example-workflowId',
    workflowTab: 'summary',
  }),
}));

jest.mock('../../config/workflow-page-tabs.config', () => [
  {
    key: 'summary',
    title: 'Summary',
    artwork: () => <div data-testid="summary-artwork" />,
  },
  {
    key: 'page-2',
    title: 'Page 2',
  },
]);

describe('WorkflowPageTabs', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders tabs titles correctly', () => {
    const { getByText } = setup();

    workflowPageTabsConfig.forEach(({ title }) => {
      expect(getByText(title)).toBeInTheDocument();
    });
  });
  it('renders tabs artworks correctly', () => {
    const { queryByTestId, getByTestId } = setup();
    workflowPageTabsConfig.forEach(({ key, artwork }) => {
      if (typeof artwork !== 'undefined')
        expect(getByTestId(`${key}-artwork`)).toBeInTheDocument();
      else expect(queryByTestId(`${key}-artwork`)).not.toBeInTheDocument();
    });
  });
});

function setup() {
  return render(
    <WorkflowPageTabs />
  );
}
