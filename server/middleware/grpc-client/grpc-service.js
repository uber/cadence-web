// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const path = require('path');
const get = require('lodash.get');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { formatRequestDefault } = require('./format-request');
const { formatResponseDefault } = require('./format-response');
const { transformDefault } = require('./transform');

const BASE_PATH = path.join(__dirname, '../../idl/proto');
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

          this.service[method](
            formatRequest(transform(payload)),
            this.meta(),
            { deadline },
            (error, response) => {
              try {
                if (error) {
                  return this.ctx.throw(
                    GRPC_ERROR_STATUS_TO_HTTP_ERROR_CODE_MAP[error.code] || 500,
                    null,
                    error.details || error.message || response.body || response
                  );
                }

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
