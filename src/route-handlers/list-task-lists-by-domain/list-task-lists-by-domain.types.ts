import { type PollerInfo } from '@/__generated__/proto-ts/uber/cadence/api/v1/PollerInfo';

export type RouteParams = {
  domain: string;
  cluster: string;
};

export type RequestParams = {
  params: RouteParams;
};

export type Poller = Omit<PollerInfo, 'lastAccessTime'> & {
  decisionHandler: boolean;
  activityHandler: boolean;
  lastAccessTime?: number;
};

export type TaskList = {
  name: string;
  pollers: Array<Poller>;
};

export type ListTaskListsByDomainResponse = { taskLists: Array<TaskList> };
