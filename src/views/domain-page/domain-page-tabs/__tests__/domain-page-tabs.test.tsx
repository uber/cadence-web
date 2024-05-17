import React from 'react';
import { render, screen } from '@/test-utils/rtl';

import DomainPageTabs from '../domain-page-tabs';
import domainPageTabsConfig from '../../config/domain-page-tabs.config';
import { PageTab } from '@/components/page-tabs/page-tabs.types';

jest.mock('../../config/domain-page-tabs.config', () => [
  {
    key: 'workflows',
    title: 'Workflows',
    artwork: () => <div data-testid="workflows-artwork" />,
  },
  {
    key: 'page-2',
    title: 'Page 2',
  },
]);

describe('DomainPageTabs', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders tabs titles correctly', () => {
    render(<DomainPageTabs />);

    domainPageTabsConfig.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders tabs artworks correctly', () => {
    render(<DomainPageTabs />);

    domainPageTabsConfig.forEach(({ key, artwork }: PageTab) => {
      if (typeof artwork !== 'undefined')
        expect(screen.getByTestId(`${key}-artwork`)).toBeInTheDocument();
      else
        expect(screen.queryByTestId(`${key}-artwork`)).not.toBeInTheDocument();
    });
  });
});
