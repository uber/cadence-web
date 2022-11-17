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

const {
  DOMAIN_LIST_DELAY_MS,
  DOMAIN_LIST_PAGE_SIZE,
  DOMAIN_LIST_RETRY_MAX,
} = require('../constants');
const { delay } = require('../../../helpers');

const fetchDomainListNextPage = async ({
  ctx,
  delayTime = DOMAIN_LIST_DELAY_MS,
  domainList = [],
  nextPageToken,
  pageSize = DOMAIN_LIST_PAGE_SIZE,
  retryCount = 0,
}) => {
  let data;

  if (retryCount >= DOMAIN_LIST_RETRY_MAX) {
    return domainList;
  }

  try {
    data = await ctx.cadence.listDomains({
      pageSize,
      nextPageToken,
    });
  } catch (error) {
    console.log(
      `fetchDomainListNextPage retry: ${retryCount} error: ${(error &&
        error.message) ||
        error}`
    );

    await delay(delayTime);

    return fetchDomainListNextPage({
      ctx,
      delayTime,
      nextPageToken,
      domainList,
      pageSize,
      retryCount: retryCount + 1,
    });
  }

  domainList.splice(domainList.length, 0, ...data.domains);

  if (!data.nextPageToken) {
    return domainList;
  }

  await delay(delayTime);

  return fetchDomainListNextPage({
    ctx,
    delayTime,
    nextPageToken: data.nextPageToken,
    domainList,
    pageSize,
  });
};

module.exports = fetchDomainListNextPage;
