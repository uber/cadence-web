const get = require('lodash.get');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { formatRequestDefault } = require('./format-request');
const { formatResponseDefault } = require('./format-response');
const { transformDefault } = require('./transform');

const BASE_PATH = path.resolve('./server/idl/proto');
const MAX_MESSAGE_SIZE = 64 * 1024 * 1024;
const GRPC_OPTIONS = {
  'grpc.max_send_message_length': MAX_MESSAGE_SIZE,
  'grpc.max_receive_message_length': MAX_MESSAGE_SIZE,
};

class GRPCService {
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

    // console.log(servicePath, ': ', ServiceDefinition);

    this.service = new ServiceDefinition(peers, grpc.credentials.createInsecure(), GRPC_OPTIONS);
    this.requestConfig = requestConfig;
  }

  request({ formatRequest = formatRequestDefault, formatResponse = formatResponseDefault, method, transform = transformDefault }) {
    return (payload) => {
      const deadline = new Date();
      deadline.setSeconds(deadline.getSeconds() + 2);

      return new Promise((resolve, reject) => {
        this.service.waitForReady(deadline, (error) => {
          if (error) {
            return reject(String(error));
          }

          deadline.setSeconds(deadline.getSeconds() + 50);

          console.log('payload with format & transform:')
          console.dir(formatRequest(transform(payload)), { depth: 10 });

          this.service[method](formatRequest(transform(payload)), this.meta(), { deadline }, (error, response) => {
            if (error) {
              return reject(String(error));
            }

            // console.log('raw:');
            // console.dir(response, { depth: 10 });
            console.log('formatted response:');
            console.dir(formatResponse(response), { depth: 10 });
            return resolve(formatResponse(response));
          });
        });
      });
    };
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

module.exports = GRPCService;
