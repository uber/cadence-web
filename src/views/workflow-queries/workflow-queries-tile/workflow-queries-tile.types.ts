import { type QueryStatus } from '@tanstack/react-query';

export type WorkflowQueryStatus = QueryStatus | 'fetching';

export type Props = {
  name: string;
  input: string | undefined;
  onChangeInput: (v: string | undefined) => void;
  isSelected: boolean;
  onClick: () => void;
  runQuery: () => void;
  queryStatus?: WorkflowQueryStatus;
};
