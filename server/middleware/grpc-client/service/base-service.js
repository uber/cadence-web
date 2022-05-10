const get = require('lodash.get');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

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
          bytes: String,
          defaults: true,
          enums: String,
          includeDirs: [BASE_PATH],
          longs: String,
          oneofs: true,
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
      this.service.waitForReady(deadline, (error) => {
        if (error) {
          return reject(String(error));
        }

        deadline.setSeconds(deadline.getSeconds() + 50);
        this.service[method](payload, this.meta(), { deadline }, (error, response) => {
          if (error) {
            return reject(String(error));
          }

          console.log(`this.service[${method}] response: ${response}`);
          return resolve(response);
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
