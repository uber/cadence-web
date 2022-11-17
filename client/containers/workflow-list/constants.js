// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export const FILTER_BY_START_TIME = 'StartTime';
export const FILTER_BY_CLOSE_TIME = 'CloseTime';

export const FILTER_MODE_ADVANCED = 'advanced';
export const FILTER_MODE_BASIC = 'basic';

export const IS_CRON_ALL = '';
export const IS_CRON_TRUE = 'true';
export const IS_CRON_FALSE = 'false';
export const IS_CRON_LIST = [
  { value: IS_CRON_ALL, label: 'All' },
  { value: IS_CRON_TRUE, label: 'Is a cron' },
  { value: IS_CRON_FALSE, label: 'Is not a cron' },
];
export const IS_CRON_LIST_OPTION_DEFAULT = IS_CRON_LIST[0];

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

export const STATUS_LIST_OPTION_DEFAULT = STATUS_LIST[0];
