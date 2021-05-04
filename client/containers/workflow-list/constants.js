// Copyright (c) 2021 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

export const FILTER_MODE_ADVANCED = 'advanced';
export const FILTER_MODE_BASIC = 'basic';

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
