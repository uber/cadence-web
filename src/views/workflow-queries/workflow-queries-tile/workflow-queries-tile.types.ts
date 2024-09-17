import { type QueryStatus } from '@tanstack/react-query';

export type Props = {
  name: string;
  input: string | undefined;
  setInput: (v: string | undefined) => void;
  isSelected: boolean;
  onSelect: () => void;
  runQuery: () => void;
  queryStatus?: QueryStatus;
};
