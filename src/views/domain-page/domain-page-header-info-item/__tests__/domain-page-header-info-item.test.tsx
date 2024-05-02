import React from 'react';
import { render, screen } from '@/test-utils/rtl';

import DomainPageHeaderInfoItem from '../domain-page-header-info-item';

describe(DomainPageHeaderInfoItem.name, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render text content correctly', () => {
    render(
      <DomainPageHeaderInfoItem title="Test title" content="Test content" />
    );

    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('Should render React Node content correctly', () => {
    const mockContent = <div data-testid="mock-content-id" />;
    render(
      <DomainPageHeaderInfoItem title="Test title" content={mockContent} />
    );

    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByTestId('mock-content-id')).toBeInTheDocument();
  });
});
