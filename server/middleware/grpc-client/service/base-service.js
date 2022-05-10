const get = require('lodash.get');
const grpc = require('@grpc/grpc-js');
// const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
// const url = require('url');
const { formatPayload, formatResponse } = require('../helpers');

const BASE_PATH = path.resolve('./server/idl/proto');
const MAX_MESSAGE_SIZE = 64 * 1024 * 1024;
const GRPC_OPTIONS = {
  'grpc.max_send_message_length': MAX_MESSAGE_SIZE,
  'grpc.max_receive_message_length': MAX_MESSAGE_SIZE,
};

class BaseService {
  constructor({ peers, requestConfig, schemaPath, servicePath }) {
    const ServiceDefinition = get(
      grpc.loadPackageDefinition(
        protoLoader.loadSync(path.join(BASE_PATH, schemaPath), {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
          includeDirs: [BASE_PATH],
        })
      ),
      servicePath
    );

    console.log(servicePath, ': ', ServiceDefinition);

    this.service = new ServiceDefinition(peers, grpc.credentials.createInsecure(), GRPC_OPTIONS);
    this.requestConfig = requestConfig;
  }

  async request({ method, payload }) {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 2);

    return new Promise((resolve, reject) => {
      console.log('this.service.waitForReady called?', method, formatPayload(payload), this.meta());
      this.service.waitForReady(deadline, (error) => {
        console.log('this.service.waitForReady error?', error);
        if (error) {
          return reject(String(error));
        }

        deadline.setSeconds(deadline.getSeconds() + 50);
        console.log('this.service[method] called?');
        this.service[method](formatPayload(payload), this.meta(), { deadline }, (error, response) => {
          console.log('this.service[method] error?', error);
          if (error) {
            return reject(String(error));
          }

          console.log('this.service[method] response:', formatResponse(response));
          return resolve(formatResponse(response));
        });
      });
    });
  }

  close() {
    grpc.getClientChannel(this.service).close()
  }

  meta() {
    const meta = new grpc.Metadata();
    meta.add('rpc-service', this.requestConfig.serviceName);
    meta.add('rpc-caller', 'cadence-ui');
    meta.add('rpc-encoding', 'proto');
    return meta;
  }
}

module.exports = BaseService;
