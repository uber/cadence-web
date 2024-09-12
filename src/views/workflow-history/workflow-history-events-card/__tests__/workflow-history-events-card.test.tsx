import { render, screen } from '@/test-utils/rtl';

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
});
