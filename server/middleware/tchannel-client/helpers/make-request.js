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

const formatBody = require('./format-body');
const formatMethod = require('./format-method');
const formatRequestName = require('./format-request-name');
const uiTransform = require('./ui-transform');
const withNextPageTokenBodyTransform = require('./with-next-page-token-body-transform');

const makeRequest = ({ authTokenHeaders, channels, ctx, requestConfig }) => ({
  bodyTransform = withNextPageTokenBodyTransform,
  channelName = 'cadence',
  method,
  requestName,
  responseTransform = uiTransform,
  serviceName = 'WorkflowService',
}) => body =>
  new Promise((resolve, reject) => {
    try {
      channels[channelName].request(requestConfig).send(
        formatMethod({ method, serviceName }),
        {
          ...authTokenHeaders,
        },
        {
          [formatRequestName(requestName)]: formatBody({
            body,
            bodyTransform,
          }),
        },
        (error, response) => {
          try {
            if (error) {
              reject(error);
            } else if (response.ok) {
              resolve(responseTransform(response.body));
            } else {
              ctx.throw(
                response.typeName === 'entityNotExistError' ? 404 : 400,
                null,
                response.body || response
              );
            }
          } catch (error) {
            reject(error);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });

module.exports = makeRequest;
