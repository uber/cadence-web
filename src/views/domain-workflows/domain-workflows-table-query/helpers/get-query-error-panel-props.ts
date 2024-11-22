import { type Props as ErrorPanelProps } from '@/components/error-panel/error-panel.types';
import { type RequestError } from '@/utils/request/request-error';

export default function getQueryErrorPanelProps({
  error,
}: {
  error: RequestError;
}): ErrorPanelProps {
  if (error.status === 400) {
    return {
      message: 'Error in query: ' + error.message,
    };
  }

  return {
    message: 'Failed to fetch workflows',
    actions: [{ kind: 'retry', label: 'Retry' }],
  };
}
