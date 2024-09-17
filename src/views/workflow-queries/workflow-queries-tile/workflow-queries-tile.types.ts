import { type QueryStatus } from '@tanstack/react-query';

export type Props = {
  name: string;
  input: string | undefined;
  isSelected: boolean;
  onSelect: () => void;
  setInput: (v: string | undefined) => void;
  runQuery: () => void;
  queryStatus?: QueryStatus;
};
