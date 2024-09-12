import { render, screen, userEvent, act } from '@/test-utils/rtl';

import WorkflowHistoryEventsCard from '../workflow-history-events-card';
import type { Props } from '../workflow-history-events-card.types';

jest.mock(
  '../../workflow-history-event-status-badge/workflow-history-event-status-badge',
  () => jest.fn(({ status }) => <div>{status} status</div>)
);
describe('WorkflowHistoryEventsCard', () => {
  it('shows events label and status correctly', () => {
    const eventsMetadata: Props['eventsMetadata'] = [
      {
        label: 'First event',
        status: 'COMPLETED',
      },
      {
        label: 'Second event',
        status: 'ONGOING',
      },
    ];
    render(<WorkflowHistoryEventsCard eventsMetadata={eventsMetadata} />);

    expect(screen.getByText('First event')).toBeInTheDocument();
    expect(screen.getByText('COMPLETED status')).toBeInTheDocument();

    expect(screen.getByText('Second event')).toBeInTheDocument();
    expect(screen.getByText('ONGOING status')).toBeInTheDocument();
  });

  it('render accordion collapsed initially', () => {
    const eventsMetadata: Props['eventsMetadata'] = [
      {
        label: 'First event',
        status: 'COMPLETED',
      },
    ];
    render(<WorkflowHistoryEventsCard eventsMetadata={eventsMetadata} />);

    expect(screen.queryByText('Placeholder text')).not.toBeInTheDocument();
  });

  it('expand panel onClick', async () => {
    const eventsMetadata: Props['eventsMetadata'] = [
      {
        label: 'First event',
        status: 'COMPLETED',
      },
      {
        label: 'Second event',
        status: 'ONGOING',
      },
    ];
    render(<WorkflowHistoryEventsCard eventsMetadata={eventsMetadata} />);
    expect(screen.queryByText('Placeholder text 1')).not.toBeInTheDocument();

    await act(async () => {
      await userEvent.click(screen.getByText('Second event'));
    });
    const panelContent = screen.getByText('Placeholder text 1');
    expect(panelContent).toBeInTheDocument();
  });

  it('should add placeholder event when showMissingEventPlaceholder is set to true', async () => {
    const eventsMetadata: Props['eventsMetadata'] = [
      {
        label: 'First event',
        status: 'COMPLETED',
      },
    ];
    const { container } = render(
      <WorkflowHistoryEventsCard
        eventsMetadata={eventsMetadata}
        showMissingEventPlaceholder
      />
    );
    expect(container.querySelector('[testid="loader"]')).toBeInTheDocument();
  });

  it('should add placeholder event when showMissingEventPlaceholder and eventsMetadata is empty', async () => {
    const eventsMetadata: Props['eventsMetadata'] = [];
    const { container } = render(
      <WorkflowHistoryEventsCard
        eventsMetadata={eventsMetadata}
        showMissingEventPlaceholder
      />
    );
    expect(container.querySelector('[testid="loader"]')).toBeInTheDocument();
  });

  it('should handle eventsMetadata set to null  gracefully', async () => {
    //@ts-expect-error Type 'null' is not assignable to type 'Pick<HistoryGroupEventMetadata, "label" | "status">[]'
    render(<WorkflowHistoryEventsCard eventsMetadata={null} />);
  });
});
