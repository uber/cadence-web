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

const losslessJSON = require('lossless-json');

const workflowExportHandler = async ctx => {
  let nextPageToken;

  do {
    const page = await ctx.cadence.exportHistory({ nextPageToken });

    if (!nextPageToken) {
      ctx.status = 200;
    }

    ctx.res.write(
      (nextPageToken ? ',' : '[') +
        page.history.events.map(losslessJSON.stringify).join(',')
    );
    nextPageToken = page.nextPageToken;
  } while (nextPageToken);

  ctx.res.write(']');
  ctx.body = '';
};

module.exports = workflowExportHandler;
