import React from 'react';
import { render, screen, fireEvent, act } from '@/test-utils/rtl';
import WorkflowStatusTag from '../workflow-status-tag';

import { type WorkflowStatus } from '../workflow-status-tag.types';

describe('WorkflowStatus', () => {
  beforeEach(() => {
    window.open = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const tests: Array<{
    name: string;
    workflowStatus: WorkflowStatus;
    text: string;
    link?: string;
    icons?: Array<string>;
  }> = [
    {
      name: 'should render Running correctly',
      workflowStatus: 'running',
      text: 'Running',
      icons: ['running-spinner'],
    },
    {
      name: 'should render Completed correctly',
      workflowStatus: 'completed',
      text: 'Completed',
    },
    {
      name: 'should render Failed correctly',
      workflowStatus: 'failed',
      text: 'Failed',
    },
    {
      name: 'should render Timed Out correctly',
      workflowStatus: 'timedOut',
      text: 'Timed Out',
    },
    {
      name: 'should render Canceled correctly',
      workflowStatus: 'canceled',
      text: 'Canceled',
    },
    {
      name: 'should render Terminated correctly',
      workflowStatus: 'terminated',
      text: 'Terminated',
    },
    {
      name: 'should render Continued As New correctly',
      workflowStatus: 'continuedAsNew',
      text: 'Continued As New',
    },
    {
      name: 'should work with links correctly',
      workflowStatus: 'continuedAsNew',
      text: 'Continued As New',
      link: 'mock_continued_workflow_link',
    },
  ];

  tests.forEach((test) => {
    it(test.name, () => {
      render(
        <WorkflowStatusTag status={test.workflowStatus} link={test.link} />
      );

      const tag = screen.getByText(test.text);
      expect(tag).toBeDefined();

      if (test.icons) {
        test.icons.forEach((icon) => {
          expect(screen.getByTestId(`${icon}`)).toBeDefined();
        });
      }

      if (test.link) {
        fireEvent.click(tag);
        expect(window.open).toHaveBeenCalledWith(test.link);
      }
    });
  });
});
