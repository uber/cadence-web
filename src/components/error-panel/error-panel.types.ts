type RetryAction = {
  kind: 'retry';
};

type InternalLinkAction = {
  kind: 'link-internal';
  link: string;
};

type ExternalLinkAction = {
  kind: 'link-external';
  link: string;
};

export type ErrorAction = RetryAction | InternalLinkAction | ExternalLinkAction;

export type Props = {
  message: string;
  actions: Array<ErrorAction>;
};
