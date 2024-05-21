module.exports = {
    peers:  process.env.CADENCE_TCHANNEL_PEERS || '127.0.0.1:7933', 
    transportClientType: process.env.TRANSPORT_CLIENT_TYPE || 'tchannel', // 'tchannel', 'grpc', // 'tchannel', 'grpc'
    useWebpack: process.env.NODE_ENV !== 'production',
    enableAuth: process.env.ENABLE_AUTH === 'true',
    authType: process.env.AUTH_TYPE,
    authAdminJwtPrivateKey: process.env.AUTH_ADMIN_JWT_PRIVATE_KEY,
    requestConfig: {
        retryFlags: { onConnectionError: true },
        retryLimit: process.env.CADENCE_TCHANNEL_RETRY_LIMIT || 3,
        serviceName: process.env.CADENCE_TCHANNEL_SERVICE || 'cadence-frontend',
        timeout: 1000 * 60 * 5,
      }
}