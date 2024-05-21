const {
  PEERS_DEFAULT,
  REQUEST_RETRY_FLAGS_DEFAULT,
  REQUEST_RETRY_LIMIT_DEFAULT,
  REQUEST_TIMEOUT_DEFAULT,
  SERVICE_NAME_DEFAULT,
  TRANSPORT_CLIENT_TYPE_DEFAULT,
} = require('./constants')

module.exports = {
    peers: process.env.CADENCE_TCHANNEL_PEERS || PEERS_DEFAULT,
    transportClientType: process.env.TRANSPORT_CLIENT_TYPE || TRANSPORT_CLIENT_TYPE_DEFAULT,
    useWebpack: process.env.NODE_ENV !== 'production',
    enableAuth: process.env.ENABLE_AUTH === 'true',
    authType: process.env.AUTH_TYPE,
    authAdminJwtPrivateKey: process.env.AUTH_ADMIN_JWT_PRIVATE_KEY,
    requestConfig: {
        retryFlags: REQUEST_RETRY_FLAGS_DEFAULT,
        retryLimit: process.env.CADENCE_TCHANNEL_RETRY_LIMIT || REQUEST_RETRY_LIMIT_DEFAULT,
        serviceName: process.env.CADENCE_TCHANNEL_SERVICE || SERVICE_NAME_DEFAULT,
        timeout: REQUEST_TIMEOUT_DEFAULT,
      }
}