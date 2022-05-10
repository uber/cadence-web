const get = require('lodash.get');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const BASE_PATH = path.resolve('./server/idl/proto');

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

    this.service = new ServiceDefinition(peers, grpc.credentials.createInsecure());
    this.requestConfig = requestConfig;
  }

  async request({ method, payload }) {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 2);

    return new Promise((resolve, reject) => {
      console.log('this.service.waitForReady called?');
      this.service.waitForReady(deadline, (error) => {
        console.log('this.service.waitForReady error?', error);
        if (error) {
          return reject(String(error));
        }

        deadline.setSeconds(deadline.getSeconds() + 50);
        console.log('this.service[method] called?');
        this.service[method](payload, this.meta(), { deadline }, (error, response) => {
          console.log('this.service[method] error?', error);
          if (error) {
            return reject(String(error));
          }

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
    meta.add('rpc-service', this.requestConfig.serviceName);  // todo - need to assign this from somewhere?
    meta.add('rpc-caller', 'cadence-ui');
    meta.add('rpc-encoding', 'proto');
    return meta;
  }
}

module.exports = BaseService;
