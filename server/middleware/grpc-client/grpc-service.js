// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

const path = require('path');
const get = require('lodash.get');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { formatRequestDefault } = require('./format-request');
const { formatResponseDefault } = require('./format-response');
const { transformDefault } = require('./transform');

const BASE_PATH = path.resolve('./server/idl/proto');
const MAX_MESSAGE_SIZE = 64 * 1024 * 1024;
const GRPC_OPTIONS = {
  'grpc.max_send_message_length': MAX_MESSAGE_SIZE,
  'grpc.max_receive_message_length': MAX_MESSAGE_SIZE,
};
const GRPC_ERROR_STATUS_TO_HTTP_ERROR_CODE_MAP = {
  [grpc.status.INVALID_ARGUMENT]: 400,
  [grpc.status.NOT_FOUND]: 404,
};

class GRPCService {
  constructor({ ctx, peers, requestConfig, schemaPath, servicePath }) {
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

    this.ctx = ctx;
    this.service = new ServiceDefinition(
      peers,
      grpc.credentials.createInsecure(),
      GRPC_OPTIONS
    );
    this.requestConfig = requestConfig;
  }

  request({
    formatRequest = formatRequestDefault,
    formatResponse = formatResponseDefault,
    method,
    transform = transformDefault,
  }) {
    return payload => {
      const deadline = new Date();

      deadline.setSeconds(deadline.getSeconds() + 2);

      return new Promise((resolve, reject) => {
        this.service.waitForReady(deadline, error => {
          if (error) {
            return reject(error);
          }

          deadline.setSeconds(deadline.getSeconds() + 50);

          console.log('payload with format & transform:');
          console.dir(formatRequest(transform(payload)), { depth: 10 });

          this.service[method](
            formatRequest(transform(payload)),
            this.meta(),
            { deadline },
            (error, response) => {
              try {
                if (error) {
                  console.log('error string:', String(error));
                  console.log('raw error = ');
                  console.log(error.code);
                  console.log(error.message);
                  console.log(error.details);
                  // console.dir(error, { depth: 10 });

                  return this.ctx.throw(
                    GRPC_ERROR_STATUS_TO_HTTP_ERROR_CODE_MAP[error.code] || 500,
                    null,
                    error.details || error.message || response.body || response
                  );
                }

                console.log('raw:');
                console.dir(response, { depth: 10 });

                console.log('formatted response:');
                console.dir(formatResponse(response), { depth: 10 });

                return resolve(formatResponse(response));
              } catch (e) {
                reject(e);
              }
            }
          );
        });
      });
    };
  }

  close() {
    grpc.getClientChannel(this.service).close();
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
