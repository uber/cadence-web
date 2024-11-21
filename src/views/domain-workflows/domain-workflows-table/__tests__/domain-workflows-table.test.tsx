import { render, screen } from '@/test-utils/rtl';

import * as usePageQueryParamsModule from '@/hooks/use-page-query-params/use-page-query-params';

import { mockDomainWorkflowsQueryParamsValues } from '../../__fixtures__/domain-workflows-query-params';
import DomainWorkflowsTable from '../domain-workflows-table';

jest.mock(
  '../../domain-workflows-table-search/domain-workflows-table-search',
  () => jest.fn(() => <div>Search results table</div>)
);

jest.mock(
  '../../domain-workflows-table-query/domain-workflows-table-query',
  () => jest.fn(() => <div>Query results table</div>)
);

jest.mock('@/hooks/use-page-query-params/use-page-query-params', () =>
  jest.fn(() => [mockDomainWorkflowsQueryParamsValues, jest.fn()])
);

describe(DomainWorkflowsTable.name, () => {
  it('renders search table by default', async () => {
    render(
      <DomainWorkflowsTable domain="mock-domain" cluster="mock-cluster" />
    );

    expect(await screen.findByText('Search results table')).toBeInTheDocument();
  });

  it('renders query table if inputType is query', async () => {
    jest
      .spyOn(usePageQueryParamsModule, 'default')
      .mockReturnValue([
        { ...mockDomainWorkflowsQueryParamsValues, inputType: 'query' },
        jest.fn(),
      ]);

    render(
      <DomainWorkflowsTable domain="mock-domain" cluster="mock-cluster" />
    );

    expect(await screen.findByText('Query results table')).toBeInTheDocument();
  });
});
