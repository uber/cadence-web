import React from 'react';
import { render, fireEvent, screen } from '@/test-utils/rtl';
import copy from 'copy-to-clipboard';
import WorkflowSummaryTabJsonView from '../workflow-summary-tab-json-view';

// Mock dependencies
jest.mock('copy-to-clipboard', jest.fn);
jest.mock(
  '@/components/segmented-control-rounded/segmented-control-rounded',
  () => jest.fn(() => <div>SegmentedControlRounded Mock</div>)
);
jest.mock('@/components/pretty-json/pretty-json', () =>
  jest.fn(() => <div>PrettyJson Mock</div>)
);

describe('WorkflowSummaryTabJsonView Component', () => {
  const inputJson = { input: 'inputJson' };
  const resultJson = { result: 'resultJson' };

  it('renders correctly with initial props', () => {
    const { getByText } = render(
      <WorkflowSummaryTabJsonView
        inputJson={inputJson}
        resultJson={resultJson}
      />
    );

    expect(getByText('SegmentedControlRounded Mock')).toBeInTheDocument();
    expect(getByText('PrettyJson Mock')).toBeInTheDocument();
  });

  it('handles tab change', () => {
    render(
      <WorkflowSummaryTabJsonView
        inputJson={inputJson}
        resultJson={resultJson}
      />
    );

    // Mock the onChange event for SegmentedControlRounded
    const segmentedControl = screen.getByText('SegmentedControlRounded Mock');
    fireEvent.click(segmentedControl);
    expect(segmentedControl).toBeInTheDocument();
  });

  it('copies JSON to clipboard and shows tooltip', () => {
    render(
      <WorkflowSummaryTabJsonView
        inputJson={inputJson}
        resultJson={resultJson}
      />
    );

    const copyButton = screen.getByText('Copy');
    fireEvent.click(copyButton);

    expect(copy).toHaveBeenCalledWith(JSON.stringify(inputJson, null, '\t'));
  });
});
