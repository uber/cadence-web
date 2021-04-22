const getPeers = () => process.env.CADENCE_TCHANNEL_PEERS
  ? process.env.CADENCE_TCHANNEL_PEERS.split(',')
  : ['127.0.0.1:7933'];

module.exports = getPeers;
