const isIPv4 = require('is-ipv4-node');
const path = require('path');
const TChannelAsThrift = require('tchannel/as/thrift');

const getPeers = require('./get-peers');
const lookupAsync = require('./lookup-async');

const peers = getPeers();

const makeChannel = async (client) => {
  const ipPeers = await Promise.all(
    peers.map(peer => {
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

  const tchannelAsThrift = TChannelAsThrift({
    channel: cadenceChannel,
    entryPoint: path.join(__dirname, '../../../idl/cadence.thrift'),
  });

  return tchannelAsThrift;
};

module.exports = makeChannel;
