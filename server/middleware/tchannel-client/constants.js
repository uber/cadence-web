const PEERS = process.env.CADENCE_TCHANNEL_PEERS
  ? process.env.CADENCE_TCHANNEL_PEERS.split(',')
  : ['127.0.0.1:7933'];

const REQUEST_RETRY_FLAGS = { onConnectionError: true };

const REQUEST_RETRY_LIMIT = Number(process.env.CADENCE_TCHANNEL_RETRY_LIMIT || 3);

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
