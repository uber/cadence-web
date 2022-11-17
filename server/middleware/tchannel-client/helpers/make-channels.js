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

const path = require('path');
const isIPv4 = require('is-ipv4-node');
const TChannelAsThrift = require('tchannel/as/thrift');
const lookupAsync = require('./lookup-async');

const makeChannels = async ({ client, peers }) => {
  const peerList = peers.split(',');

  const ipPeers = await Promise.all(
    peerList.map(peer => {
      const [host, port] = peer.split(':');

      if (!isIPv4(host)) {
        return lookupAsync(host).then(ip => [ip, port].join(':'));
      } else {
        return peer;
      }
    })
  );

  const cadenceChannel = client.makeSubChannel({
    serviceName: 'cadence-frontend',
    peers: ipPeers,
    requestDefaults: {
      hasNoParent: true,
      headers: { as: 'raw', cn: 'cadence-web' },
    },
  });

  const adminTChannelAsThrift = TChannelAsThrift({
    channel: cadenceChannel,
    entryPoint: path.join(__dirname, '../../../idl/thrift/admin.thrift'),
  });

  const cadenceTChannelAsThrift = TChannelAsThrift({
    channel: cadenceChannel,
    entryPoint: path.join(__dirname, '../../../idl/thrift/cadence.thrift'),
  });

  return {
    admin: adminTChannelAsThrift,
    cadence: cadenceTChannelAsThrift,
  };
};

module.exports = makeChannels;
