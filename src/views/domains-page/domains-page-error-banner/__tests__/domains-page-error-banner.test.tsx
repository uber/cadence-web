import React from 'react';

import { render, screen } from '@/test-utils/rtl';

import DomainsPageErrorBanner from '../domains-page-error-banner';

describe(DomainsPageErrorBanner.name, () => {
  it('should render if there are failed clusters', async () => {
    render(
      <DomainsPageErrorBanner failedClusters={['cluster_1', 'cluster_2']} />
    );

    expect(
      await screen.findByText(
        'Failed to fetch domains for following clusters: cluster_1, cluster_2'
      )
    ).toBeInTheDocument();
  });

  it('should not render anything if no clusters failed', async () => {
    render(<DomainsPageErrorBanner failedClusters={[]} />);

    expect(
      screen.queryByText(/Failed to fetch domains for following clusters/)
    ).toBeNull();
  });
});
