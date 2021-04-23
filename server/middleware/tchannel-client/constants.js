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

const PEERS = process.env.CADENCE_TCHANNEL_PEERS
  ? process.env.CADENCE_TCHANNEL_PEERS.split(',')
  : ['127.0.0.1:7933'];

const REQUEST_RETRY_FLAGS = { onConnectionError: true };

const REQUEST_RETRY_LIMIT = Number(
  process.env.CADENCE_TCHANNEL_RETRY_LIMIT || 3
);

const REQUEST_TIMEOUT = 1000 * 60 * 5;

const SERVICE_NAME = process.env.CADENCE_TCHANNEL_SERVICE || 'cadence-frontend';

const REQUEST_CONFIG = {
  serviceName: SERVICE_NAME,
  timeout: REQUEST_TIMEOUT,
  retryFlags: REQUEST_RETRY_FLAGS,
  retryLimit: REQUEST_RETRY_LIMIT,
};

module.exports = {
  PEERS,
  REQUEST_CONFIG,
  REQUEST_RETRY_FLAGS,
  REQUEST_RETRY_LIMIT,
  REQUEST_TIMEOUT,
  SERVICE_NAME,
};
