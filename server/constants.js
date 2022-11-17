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

const PEERS_DEFAULT = '127.0.0.1:7933';

const REQUEST_RETRY_FLAGS_DEFAULT = { onConnectionError: true };

const REQUEST_RETRY_LIMIT_DEFAULT = 3;

const REQUEST_TIMEOUT_DEFAULT = 1000 * 60 * 5;

const SERVICE_NAME_DEFAULT = 'cadence-frontend';

const TRANSPORT_CLIENT_TYPE_DEFAULT = 'tchannel'; // 'tchannel', 'grpc'

module.exports = {
  PEERS_DEFAULT,
  REQUEST_RETRY_FLAGS_DEFAULT,
  REQUEST_RETRY_LIMIT_DEFAULT,
  REQUEST_TIMEOUT_DEFAULT,
  SERVICE_NAME_DEFAULT,
  TRANSPORT_CLIENT_TYPE_DEFAULT,
};
