import { type Props as ErrorPanelProps } from '@/components/error-panel/error-panel.types';
import { type RequestError } from '@/utils/request/request-error';

export default function getSearchErrorPanelProps({
  error,
  areSearchParamsAbsent,
}: {
  error: RequestError | null;
  areSearchParamsAbsent: boolean;
}): ErrorPanelProps | undefined {
  if (error) {
    return {
      message: 'Failed to fetch workflows',
      actions: [{ kind: 'retry', label: 'Retry' }],
    };
  }

  if (areSearchParamsAbsent) {
    return {
      message: 'No workflows found for this domain',
      actions: [
        {
          kind: 'link-external',
          label: 'Get started on workflows',
          link: 'https://cadenceworkflow.io/docs/concepts/workflows',
        },
      ],
      omitLogging: true,
    };
  }

  return undefined;
}
