export type MergedQueryStatus = 'idle' | 'loading' | 'success' | 'error';

export type MergedQueriesResults<T> = {
  data: Array<T>;
  status: MergedQueryStatus;
  isLoading: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
};
