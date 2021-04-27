export const STATE_ALL = 'all';
export const STATE_CLOSED = 'closed';
export const STATE_OPEN = 'open';

export const STATUS_ALL = 'ALL';
export const STATUS_CANCELED = 'CANCELED';
export const STATUS_CLOSED = 'CLOSED';
export const STATUS_COMPLETED = 'COMPLETED';
export const STATUS_CONTINUED_AS_NEW = 'CONTINUED_AS_NEW';
export const STATUS_FAILED = 'FAILED';
export const STATUS_OPEN = 'OPEN';
export const STATUS_TERMINATED = 'TERMINATED';
export const STATUS_TIMED_OUT = 'TIMED_OUT';

export const STATUS_LIST = [
  { value: STATUS_ALL, label: 'All' },
  { value: STATUS_OPEN, label: 'Open' },
  { value: STATUS_CLOSED, label: 'Closed' },
  { value: STATUS_COMPLETED, label: 'Completed' },
  { value: STATUS_FAILED, label: 'Failed' },
  { value: STATUS_CANCELED, label: 'Cancelled' },
  { value: STATUS_TERMINATED, label: 'Terminated' },
  { value: STATUS_CONTINUED_AS_NEW, label: 'Continued As New' },
  { value: STATUS_TIMED_OUT, label: 'Timed Out' },
];
